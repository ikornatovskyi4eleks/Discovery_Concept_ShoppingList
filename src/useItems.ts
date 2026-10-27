import { useCallback, useEffect, useState } from 'react';

import type { Item, ItemStatus } from './types';

const STORAGE_KEY = 'shopping-list.items';

/** The page has a real load, so it has a real loading and error state. */
export type LoadState = 'loading' | 'ready' | 'error';

/**
 * ok      — the change was stored
 * missing — the item is no longer on the list
 * failed  — the change could not be stored
 */
export type SaveResult = 'ok' | 'missing' | 'failed';

/**
 * Throws when the list cannot be read. A first visit has no key at all, which
 * is an empty list, not a failure.
 */
function readOrThrow(): Item[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === null) return [];
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error('Stored shopping list is not a list');
  return parsed as Item[];
}

function write(next: Item[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');

  const load = useCallback(() => {
    setLoadState('loading');
    try {
      setItems(readOrThrow());
      setLoadState('ready');
    } catch {
      setItems([]);
      setLoadState('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Applies a change to the list as it stands in storage, so an item removed
   * elsewhere is reported as missing rather than silently re-created.
   */
  const apply = useCallback(
    (id: string | null, change: (current: Item[]) => Item[]): SaveResult => {
      let current: Item[];
      try {
        current = readOrThrow();
      } catch {
        return 'failed';
      }

      if (id !== null && !current.some((item) => item.id === id)) {
        setItems(current);
        return 'missing';
      }

      const next = change(current);
      try {
        write(next);
      } catch {
        return 'failed';
      }
      setItems(next);
      return 'ok';
    },
    [],
  );

  /** A new item starts as To Buy and goes after the items added earlier. */
  const addItem = useCallback(
    (name: string, quantity: number): SaveResult =>
      apply(null, (current) => [
        ...current,
        { id: crypto.randomUUID(), name, quantity, status: 'To Buy' },
      ]),
    [apply],
  );

  /** Name and quantity only. Position and status stay. */
  const editItem = useCallback(
    (id: string, name: string, quantity: number): SaveResult =>
      apply(id, (current) =>
        current.map((item) => (item.id === id ? { ...item, name, quantity } : item)),
      ),
    [apply],
  );

  /** To Buy becomes Purchased, Purchased becomes To Buy. Position stays. */
  const setStatus = useCallback(
    (id: string, status: ItemStatus): SaveResult =>
      apply(id, (current) => current.map((item) => (item.id === id ? { ...item, status } : item))),
    [apply],
  );

  const deleteItem = useCallback(
    (id: string): SaveResult => apply(id, (current) => current.filter((item) => item.id !== id)),
    [apply],
  );

  return { items, loadState, reload: load, addItem, editItem, setStatus, deleteItem };
}
