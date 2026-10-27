# Add an item

**Product:** Shopping List
**Use Case:** UC-01 Add an item
**Area:** Items
**Capabilities:** Add an item with a name and a quantity
**Version:** 1.8
**Date:** 2026-10-19
**Author:** Liliia (BA)

> The user adds an item by name. The quantity starts at 1. The item is stored as To Buy.

---

## Overview

**Goal:** Store a new item on the shopping list. `[prd]`
**Actors:** User. No permission limits this action to one role.
**Trigger:** The user starts adding an item. `[prd]`
**Preconditions:** Version 1 has one shopping list. `[glossary]`

---

## Flow Diagram

```mermaid
flowchart TD
  Start(["User starts adding an item"]) --> Enter["User enters a name and may enter a quantity"]
  Enter --> Valid{"Name and quantity pass the field checks?"}
  Valid -- "No" --> EndErr(["Error"])
  Valid -- "Yes" --> Store["System stores the item as To Buy"]
  Store --> Stored{"The item was stored?"}
  Stored -- "No" --> EndStore(["Error"])
  Stored -- "Yes" --> Appear["The item appears after items added earlier"]
  Appear --> EndOk(["Success — the user sees the new item"])

  style Start fill:#E8F5E9,stroke:#2E7D32
  style EndOk fill:#E8F5E9,stroke:#2E7D32
  style EndErr fill:#FFCDD2,stroke:#C62828
  style EndStore fill:#FFCDD2,stroke:#C62828
```

---

## Flow Steps

| # | Actor | Action | System Response | Screen / Component | BR |
|---|---|---|---|---|---|
| 1 | User | Starts adding an item | Accepts an item name and a quantity | `[gap: screen not mapped]` | |
| 2 | System | Sets the quantity when the user does not enter one | The quantity starts at 1 | `[gap: screen not mapped]` | |
| 3 | User | Enters an item name and may enter a quantity | Holds the entered values | `[gap: screen not mapped]` | |
| 4 | System | Trims the item name and checks the name and the quantity | The name is required, trimmed, and at most 100 characters. The quantity is a positive whole number, at most 999. These checks stay on the item spec | `[gap: screen not mapped]` | |
| 5 | System | Stores the item on the shopping list | The status is To Buy. A matching item name does not block the add. The identifier and the add time are stored and are not shown | `[gap: screen not mapped]` | `[BR-002](../business-rules-catalog.md)`, `[BR-001](../business-rules-catalog.md)` |
| 6 | System | Places the item after items added earlier | The new item is visible with the other items | `[gap: screen not mapped]` |  |
| 7 | User | Sees the new item | The item is on the list as To Buy | `[gap: screen not mapped]` | |

---

## Error and Edge Cases

| Scenario | Behavior | BR |
|---|---|---|
| The name or the quantity fails the field checks | The error shows under the field. The entered values stay. The user corrects the field and submits again. `[operator-2]` | |
| The item cannot be stored | A save message shows. The entered values stay. The user submits again. `[operator-2]` | |
| The user leaves before the item is stored | `[gap: whether anything is kept]` | |
| The item name matches an item already on the list | The add is not blocked. A matching name does not warn. `[operator]` | `[BR-001](../business-rules-catalog.md)` |
| The filter that was selected before the add | `[gap: whether the add changes the selected filter]` | |

### Decision Nodes

| After step # | Condition | Yes / Valid → | No / Invalid → | BR |
|---|---|---|---|---|
| 4 | The name and the quantity pass the field checks | Step 5 | Error under the field. Back to step 3 with the values kept | |
| 5 | The item was stored | Step 6 | Save message. Back to step 3 with the values kept | `[BR-002](../business-rules-catalog.md)` |

### Error States

| Triggered at step # | Error condition | What the user sees | Recovery path |
|---|---|---|---|
| 4 | The name or the quantity fails the field checks | The field message from the [ITEM](../../domain/erd/entities/ITEM.md) spec, under the field | The user corrects the field and submits again |
| 5 | The item cannot be stored | "Couldn't save your changes. Try again." | The user submits again. The values stay |

---

## Friction Points

No friction is recorded.

**Scope signals:** No scope signal.

---

## Traceability

**Features:** [F-011](../feature-tree.md)
**Entities:** [SHOPPING_LIST](../../domain/erd/entities/SHOPPING_LIST.md) (read), [ITEM](../../domain/erd/entities/ITEM.md) (create)
**Rules:** `[BR-002](../business-rules-catalog.md)`, `[BR-001](../business-rules-catalog.md)`
**NFRs:** none. Save time stays a gap in the product requirements document.

---

## Version History

| Version | Stage | What changed |
|---|---|---|
| v1.0 | 5.1 General flows | Initial flow from the product sources. Markers only. |
| v1.1 | 5.1 General flows | Markers replaced with catalog identifiers. No step change. |
| v1.2 | 5.1 General flows | Actor is User. Diagram error ends say Error. No field layout and no message wording. |

| v1.3 | 5.1 General flows | Diagram ends and gaps say user. |
| v1.4 | 5.1 General flows | UX, terminology, field-default, and common-behavior identifiers removed. |

| v1.5 | 5.1 General flows | Sorting and confirmation identifiers removed after classification review. |

| v1.6 | 5.1 General flows | Rule identifiers renumbered to BR-001 and BR-002. |
| v1.7 | 5.2 Team refinement | A matching item name does not block the add and does not warn. |
| v1.8 | 6.1 Entity enrichment | Error messages and recovery from the operator-approved entity decisions. |

---

## Sources

| Marker | Source | Link |
|---|---|---|
| `[prd]` | Product requirements document | [PRD.md](../PRD.md) |
| `[feature-tree]` | Feature tree | [feature-tree.md](../feature-tree.md) |
| `[entities]` | Entity specs | [ITEM.md](../../domain/erd/entities/ITEM.md) |
| `[glossary]` | Domain glossary | [domain-glossary.md](../../domain/domain-glossary.md) |
| `[operator]` | Operator, 2026-10-16 | [2026-10-16-flows-and-rules-review.md](../../meeting-notes/2026-10-16-flows-and-rules-review.md) |
| `[operator-2]` | Operator, 2026-10-19 | [2026-10-19-entity-gaps-decisions.md](../../meeting-notes/2026-10-19-entity-gaps-decisions.md) |
