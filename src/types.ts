/** The two stored statuses. "All" is a filter value, never a stored status. */
export type ItemStatus = 'To Buy' | 'Purchased';

/** Filter values, in the order the filter shows them. */
export type FilterValue = 'All' | ItemStatus;

export interface Item {
  /** Hidden from the user. */
  id: string;
  name: string;
  quantity: number;
  status: ItemStatus;
}

export const NAME_MAX = 100;
export const QUANTITY_MIN = 1;
export const QUANTITY_MAX = 999;

/** The approved message strings. These are the only wordings allowed. */
export const MESSAGES = {
  nameRequired: 'Enter an item name.',
  nameTooLong: `Item name can be up to ${NAME_MAX} characters.`,
  quantityRange: `Quantity must be a whole number from ${QUANTITY_MIN} to ${QUANTITY_MAX}.`,
  saveFailed: "Couldn't save your changes. Try again.",
  deleteFailed: "Couldn't delete the item. Try again.",
  itemGone: 'This item is no longer on the list.',
  loadFailed: "Couldn't load your shopping list. Try again.",
  emptyList: 'Your shopping list is empty',
  noMatch: 'No items match this filter.',
} as const;
