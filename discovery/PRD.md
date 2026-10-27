# Product Requirements Document

**Product:** Shopping List
**Version:** 1.13
**Date:** 2026-10-19
**Author:** Liliia (BA); research update by Designer
**Status:** Frozen
**Project:** Shopping List
**Stakeholder:** Whitney (Stakeholder)

> **Frozen** on 2026-10-19. The team and the stakeholder approved. Simulated interviews do not validate a claim. Sections marked *[assumed]* stay evidence gaps. Later changes go through the software requirements specification.

---

## 1. Product Overview

**Product name:** Shopping List `[RFP]`

**Elevator pitch:** Shopping List is a simple web application for an individual or a small household to keep one list of items to buy, see what is still needed, and mark items purchased. `[RFP]` `[discovery-1]`

---

## 2. Problem Space

**Problem statement:** People forget items or lose track of what they still need to buy. Paper lists can be lost, and notes apps are not always convenient for managing purchased items. They need a very simple list where they can quickly add items, mark them purchased, and see what is still needed. `[discovery-1]`

**Current state:** People write items on paper, use the notes application on a phone, use a simple shopping-list application, or send the list to another household member through a messaging application. `[discovery-1]`

**Pain points:**

1. <a id="pp-1"></a>**PP-1:** People forget items or lose track of what they still need to buy. `[discovery-1]` Status after research: unconfirmed, simulated only. No imagined participant described forgetting an item. `[assumed]`
2. <a id="pp-2"></a>**PP-2:** Paper lists can be lost. `[discovery-1]` Status after research: unconfirmed, simulated only. Imagined paper users did not describe a loss. `[assumed]`
3. <a id="pp-3"></a>**PP-3:** Notes apps are not always convenient for managing purchased items. `[discovery-1]` Proposed wording (Adopt, [INS-004](../research/insight-decision-record.md#ins-004)): in a notes app, items that are bought have to be removed or left behind by hand. `[assumed]` `[stakeholder-adjusted]`
4. <a id="pp-4"></a>**PP-4:** Lists become disorganized, purchased items are not removed, and it is unclear which items are still needed. `[discovery-1]` Design bet (Adopt, [INS-001](../research/insight-decision-record.md#ins-001)): "messy" means bought and unbought lines mixed together, not a missing aisle grouping. The status filter in [UC-02](#uc-02) is the intended answer. `[assumed]` `[stakeholder-adjusted]`
5. <a id="pp-5"></a>**PP-5:** Adding an item takes too many screens. `[discovery-1]` Status after research: untested. Nobody in the imagined sample used a dedicated list app. `[assumed]`
6. <a id="pp-new-1"></a>**PP-NEW-1 (candidate):** The same item ends up on the list twice. `[assumed]` Deferred ([INS-008](../research/insight-decision-record.md#ins-008)). No change to the duplicate-name rule in [UC-01](#uc-01). `[stakeholder-adjusted]`
7. <a id="pp-new-2"></a>**PP-NEW-2 (candidate):** The writer cannot see the shopper's progress when the list is a sent copy. `[assumed]` Single source. Deferred ([INS-010](../research/insight-decision-record.md#ins-010)). `[stakeholder-adjusted]` On 2026-10-19 the operator said anyone with access to the list, through a shared link, can see the shopper's progress. `[operator-5]`

**Market context:** The reason to build this now is to demonstrate a simple full-stack product with a real-life use case. Whitney said that if it is not built, people will keep using paper or notes apps, and that is not a critical business risk. `[discovery-1]`

---

## 3. Target Users

**Primary users:** An individual, or one person in a small household, who creates the list and updates it. Two writer habits are proposed: a weekly rewrite with smaller adds, or one list that keeps growing. `[discovery-1]` `[assumed]` `[stakeholder-adjusted]`

**Secondary users:** Another household member, who may mark items purchased while shopping and may also add a line. Version 1 has no accounts. Anyone with access to the list, through a shared link, uses the same list. Local development has no sign-in. The cloud test environment uses one shared environment password. The primary and secondary labels are hats: one person may write and shop. `[discovery-1]` `[assumed]` `[stakeholder-adjusted]` `[operator-5]` `[operator-6]`

**Who this is NOT for:** Large teams, businesses, supermarkets, and people who need advanced shopping or inventory features (recipes, meal plans, store offers). A native mobile application is not part of this release. `[discovery-1]` `[assumed]` `[stakeholder-adjusted]`

**Personas:** Proto-personas only. Pass 2 was skipped. Nothing here is validated. `[assumed]` `[stakeholder-adjusted]`

| Persona | Segment | Evidence level | Link |
|---|---|---|---|
| Alex (fictional) — Household list-writer | Primary users | Proto-persona (simulated) | [personas.md](../research/personas.md) |
| Sam (fictional) — Household shopper | Secondary users | Proto-persona (simulated) | [personas.md](../research/personas.md) |

---

## 4. Goals and Success Metrics

**Product goals:**

1. <a id="pg-1"></a>**PG-1:** A new user understands the application immediately and creates a list without instructions, and can add an item quickly. `[discovery-1]`
2. <a id="pg-2"></a>**PG-2:** The user can see what remains to buy. `[discovery-1]`
3. <a id="pg-3"></a>**PG-3:** The user can mark items purchased without confusion. `[discovery-1]`

**Business goals:**

1. <a id="bg-1"></a>**BG-1:** Have a working product that is suitable for demonstration and future expansion. `[discovery-1]`
2. <a id="bg-2"></a>**BG-2:** Show a complete application with a user interface, backend services, validation, and database persistence. This is an internal demonstration and learning exercise. `[discovery-1]`

**Success metrics:**

| Metric | Type | Target | Notes |
|---|---|---|---|
| Demo acceptance | [gap: type] | [gap: numeric target] | Measured by accepting a demonstration. No numeric target was set. `[discovery-1]` Baseline: `[gap: no baseline]`. |
| Task completion | [gap: type] | A user can create, update, filter, and delete items successfully | No advanced product analytics in version 1. `[discovery-1]` Baseline: `[gap: no baseline]`. Measure by an observed task run with real people. `[assumed]` |
| Time to write the weekly list | [gap: type] | [gap: numeric target] | Nobody gave a figure. Ask in real sessions. Do not invent a number. `[assumed]` |
| Time for a mid-week update | [gap: type] | [gap: numeric target] | Imagined writers said "quick". Not a baseline. `[assumed]` |
| Time to add one item | [gap: type] | [gap: numeric target] | Tied to [PG-1](#pg-1). Measure by a timed replay of the last add. `[assumed]` |

---

## 5. Core Use Cases

| # | Use Case | Actor | Description | Pain Points | Goals | Flow | Source |
|---|----------|-------|-------------|-------------|-------|------|--------|
| <a id="uc-01"></a>UC-01 | Add an item | Primary user | The person enters an item name and a quantity. The name is required, trimmed, and at most 100 characters. The quantity is a positive whole number up to 999 and defaults to 1. Duplicate names are allowed. The item is stored and appears as To Buy, after items added earlier. Add by name alone; quantity is a secondary field (Adopt, [INS-003](../research/insight-decision-record.md#ins-003)). | PP-1, PP-5 | PG-1 | [Add an item](flows/FLOW_03_ADD_ITEM.md) | `[RFP]` `[discovery-1]` `[assumed]` `[stakeholder-adjusted]` |
| <a id="uc-02"></a>UC-02 | See what is still needed | Primary user | The person views the list and filters by All, To Buy, or Purchased. Each item shows its name, quantity, and status. Items stay in the order they were added. The list is stored in a database, so it is not a paper note that can be lost. The filter has no user signal and no competitor benchmark (Defer, [INS-012](../research/insight-decision-record.md#ins-012)). It stays because Whitney confirmed this scope. | PP-1, PP-2, PP-4 | PG-2 | [View the shopping list](flows/FLOW_01_VIEW_SHOPPING_LIST.md), [Filter the shopping list](flows/FLOW_02_FILTER_SHOPPING_LIST.md) | `[RFP]` `[discovery-1]` `[assumed]` `[stakeholder-adjusted]` |
| <a id="uc-03"></a>UC-03 | Mark an item purchased | Primary user or secondary user | The person marks an item purchased, or moves a purchased item back to To Buy. The interface word is Purchased. "Complete" in the brief means the same action. Marking must look clearly different (Adopt, [INS-002](../research/insight-decision-record.md#ins-002)). Move back to To Buy has no observed need and no benchmark; it stays (Defer, [INS-012](../research/insight-decision-record.md#ins-012)). | PP-3, PP-4 | PG-3 | [Change purchase status](flows/FLOW_06_CHANGE_PURCHASE_STATUS.md) | `[RFP]` `[discovery-1]` `[assumed]` `[stakeholder-adjusted]` |
| <a id="uc-04"></a>UC-04 | Correct an item | Primary user | The person edits an item or deletes it. Deleting asks for confirmation. The only correction seen in simulated sessions is removing a repeated line. Edit and confirmed delete stay by Whitney's scope decision, not by user signal (Defer, [INS-012](../research/insight-decision-record.md#ins-012)). | PP-4, PP-NEW-1 | PG-2 | [Edit an item](flows/FLOW_04_EDIT_ITEM.md), [Delete an item](flows/FLOW_05_DELETE_ITEM.md) | `[RFP]` `[discovery-1]` `[assumed]` `[stakeholder-adjusted]` |
| <a id="uc-new-1"></a>UC-NEW-1 (candidate) | Hand the list to another person | Primary user to secondary user | Candidate only. Deferred ([INS-010](../research/insight-decision-record.md#ins-010)). Not a version 1 use case. In version 1, anyone with access to the list, through a shared link, uses the same list and can see the shopper's progress. `[operator-5]` | PP-NEW-2, PP-1 | PG-2, PG-3 | | `[assumed]` `[stakeholder-adjusted]` `[operator-5]` |

---

## 6. Scope

The [feature tree](feature-tree.md) is the scope authority. Tags come from the operator's list on 2026-10-15. Rationale is in that tree's decision log. No feature was tagged v1.1.

### 6.1 In Scope

| L1 Area | L2 Capabilities | MVP Features | Use Cases | Source |
|---|---|---|---|---|
| Shopping list | View items in the order they were added | [F-001](feature-tree.md) | UC-02 | `[feature-tree]` |
| | Filter the list by All, To Buy, or Purchased | [F-010](feature-tree.md) | | `[feature-tree]` |
| Items | Add an item with a name and a quantity | [F-011](feature-tree.md) | UC-01, UC-04 | `[feature-tree]` |
| | Edit an item | [F-013](feature-tree.md) | | `[feature-tree]` |
| | Delete an item | [F-017](feature-tree.md) | | `[feature-tree]` |
| Purchase status | Change an item between To Buy and Purchased | [F-018](feature-tree.md), [F-019](feature-tree.md) | UC-03 | `[feature-tree]` |

A new item starts as To Buy. A purchased item can be moved back to To Buy. The user sees the name, the quantity, and the status. The system may store an internal identifier and technical timestamps; the user does not see them. Units are not part of version 1. Version 1 is one list, stored in a database, with backend validation of the name and the quantity. Whitney confirmed this scope and said version 1 should stay small, with no additional features. `[RFP]` `[discovery-1]`

**Scope signals (not a cut).** User-need language only. Directional. Simulated plus market. `[assumed]` `[stakeholder-adjusted]`

- Strongest signals: see what is left to buy apart from what is already bought; mark an item as it goes into the basket with one clear change of look; add an item by name alone.
- No signal (silence is not disproof): filter by status; enter a quantity; edit the text of a line; confirmation before delete; move a purchased item back to To Buy; aisle grouping, recipes, prices, barcode, voice.
- Unexpected: avoid or fix a repeated line; use the list in the shop on a phone or on paper; let the shopper mark and let the writer see it; clear bought items in one step or keep them; a core view free of ads; start with no sign-up.

### 6.2 Next Release

No feature was tagged v1.1. No next release was committed. `[discovery-1]` `[feature-tree]`

### 6.3 Future Considerations

Rationale for each identifier is in the [feature tree](feature-tree.md) decision log. A Future tag is not a commitment to build.

[F-002](feature-tree.md), [F-003](feature-tree.md), [F-004](feature-tree.md), [F-005](feature-tree.md), [F-006](feature-tree.md), [F-007](feature-tree.md), [F-008](feature-tree.md), [F-009](feature-tree.md), [F-012](feature-tree.md), [F-014](feature-tree.md), [F-015](feature-tree.md), [F-016](feature-tree.md). `[feature-tree]`

Whitney said a later phase could include user accounts, multiple lists, controlled sharing, prices, store-specific lists, and possibly a mobile application. Detailed requirements for those items are not needed now. This is not a commitment to build them. `[discovery-1]`

The operator tagged as Future some items the product requirements document had excluded from version 1 with no later phase named: [F-004](feature-tree.md) import or export, [F-007](feature-tree.md) user permissions, [F-008](feature-tree.md) notifications, [F-012](feature-tree.md) barcode scanning, [F-015](feature-tree.md) item units, and [F-016](feature-tree.md) a product image. `[feature-tree]`

Grocery-leader extras (aisle grouping, recipes, meal plans, offers) stay out of version 1 (Reject, [INS-013](../research/insight-decision-record.md#ins-013)). `[stakeholder-adjusted]`

---

## 7. Non-Functional Requirements

| Category | Requirement | Priority | Source |
|---|---|---|---|
| Performance | Page load and save each complete within 3 seconds. | [gap: priority] | `[operator-4]` |
| Scalability | Version 1 supports 10 users and 200 items on the one list. | [gap: priority] | `[operator-4]` |
| Availability | Deferred to architecture vision. No target was set. | [gap: priority] | `[operator-7]` |
| Accessibility | Deferred to architecture vision. No requirement was set. | [gap: priority] | `[operator-7]` |

---

## 8. Constraints

| # | Field | Constraint | Source |
|---|---|---|---|
| <a id="c-01"></a>C-01 | Technical | The client is a web app. A native mobile application is out of this release. | `[discovery-1]` |
| <a id="c-02"></a>C-02 | Technical | The browser covers desktop, tablet, and phone. Supported browsers are modern Chromium-based browsers. A native mobile application is out of this release. | `[discovery-1]` `[operator-3]` `[operator-4]` |
| <a id="c-03"></a>C-03 | Technical | No technology stack is mandatory from the business side. Use the team's standard technologies. No product was named. | `[discovery-1]` |
| <a id="c-04"></a>C-04 | Technical | The application runs locally during development and in a cloud-based test environment for demonstrations. An on-premises deployment is not needed for version 1. | `[discovery-1]` |
| <a id="c-05"></a>C-05 | Technical | Data remains available after a restart or redeployment. Backups are Azure database backups. An application upgrade does not remove existing data. | `[discovery-1]` `[operator-4]` |
| <a id="c-06"></a>C-06 | Technical | Offline use is not required. | `[discovery-1]` |
| <a id="c-07"></a>C-07 | Technical | Version 1 does not call an external service or integrate with another system. | `[discovery-1]` |
| <a id="c-08"></a>C-08 | Technical | Item name is required, trimmed, and at most 100 characters. Quantity is a positive whole number, at most 999, and defaults to 1. API validation: the server is the authority and trims the name. A failed check returns 400 with every failing field at once. A missing item returns 404. A storage failure returns a 5xx status ([D-06](../meeting-notes/2026-10-19-entity-gaps-decisions.md#d-06)). | `[discovery-1]` `[operator-2]` |
| <a id="c-09"></a>C-09 | Technical | Version 1 has no user accounts. Confirmed for the minimum viable product on 2026-10-19. Local development has no sign-in. The cloud test environment is behind one shared environment password, by basic authentication or the hosting platform's protection ([D-07](../meeting-notes/2026-10-19-entity-gaps-decisions.md#d-07)). Anyone with access to the list, through a shared link, uses that same list. | `[discovery-1]` `[operator-2]` `[operator-5]` `[operator-6]` |
| <a id="c-10"></a>C-10 | Business | HTTPS applies. No other compliance standard was named. | `[operator-4]` |

---

## 9. Dependencies

No product integration was stated. Version 1 does not call another product system. Research added none. `[discovery-1]`

Azure database backups are required. Azure DevOps pipelines are under consideration and are not selected. `[operator-4]` Environments beyond local development and a cloud test environment are deferred to architecture vision. `[operator-7]`

---

## 10. Assumptions

No A-X existed in version 1.0. These six are candidate assumptions from the [research synthesis](../research/research-synthesis.md). Status is **Deferred**. Simulated evidence cannot mark Validated or Invalidated. Real interviews are not in this discovery phase. `[stakeholder-adjusted]` `[operator-7]`

| # | Assumption | Status | Risk if wrong | Source |
|---|---|---|---|---|
| <a id="a-01"></a>A-01 | People add an item by name only and rarely enter a quantity. | Deferred | The default quantity of 1 matters less. If people do enter quantities, the field and its range need a real look. | `[assumed]` |
| <a id="a-02"></a>A-02 | The list is used in the shop on a phone or on paper, not at a desktop or tablet. | Deferred | [C-02](#c-02) already covers a phone browser, a tablet browser, and a desktop browser, so the place of use does not change the constraint. | `[assumed]` |
| <a id="a-03"></a>A-03 | Two people may add to the same list, so a repeated line can appear. | Deferred | A repeated name is allowed. See [R-02](#r-02). | `[assumed]` |
| <a id="a-04"></a>A-04 | People either keep bought lines on the list or remove them, and both are normal. | Deferred | If only one habit is real, the default view should follow it. The filter in [UC-02](#uc-02) covers both. | `[assumed]` |
| <a id="a-05"></a>A-05 | A status filter is enough to deal with a messy list. There is no need for aisle grouping. | Deferred | If wrong, grouping becomes the strongest later request. | `[assumed]` |
| <a id="a-06"></a>A-06 | A person will use a list with no account. | Deferred | Version 1 has no accounts. If people will not use a list without an account, adoption is the risk. | `[assumed]` |

---

## 11. Risks

No critical business risk was stated. Whitney said that not building the product is not a critical business risk: people would keep using paper notes or general notes apps. `[discovery-1]`

Supported browsers are modern Chromium-based browsers. Offline use is not required. The continuous integration choice and environments beyond local development and a cloud test environment are still open. `[discovery-1]` `[operator-4]`

Research added two risks from unvalidated assumptions. Neither assumption was invalidated. `[stakeholder-adjusted]`

| # | Risk | Origin | Severity | Mitigation | Source |
|---|---|---|---|---|---|
| <a id="r-01"></a>R-01 | Phone use once conflicted with a desktop-and-tablet-first constraint. | [A-02](#a-02) / [C-02](#c-02) | Closed | Closed on 2026-10-19. [C-02](#c-02) includes a phone browser. | `[operator-3]` |
| <a id="r-02"></a>R-02 | A repeated line appears while [UC-01](#uc-01) allows duplicate names. | [A-03](#a-03) | Medium | The operator decided on 2026-10-16 that a matching name is allowed. It does not warn and does not block. | `[operator]` |

---

## 12. Competitive Landscape

These were named as usability references, not as products to copy. The design stays original. `[discovery-1]`

Version 1 sits next to Google Keep and Apple Reminders, not next to AnyList and Bring!. "No account" is already taken by BuyBye!. Differentiation is a design choice, not a commercial need. `[assumed]` `[stakeholder-adjusted]`

Source for every row: [competitive analysis](../research/competitive-analysis.md) version 0.2. Public pages. No product was used hands-on.

| Competitor | How they solve the problem | Strength | Weakness | Our differentiation |
|---|---|---|---|---|
| AnyList (Direct, leader) | One shared list, always in sync, grouped by store category, with recipes and a meal plan | Best rated of the grocery apps. Autocomplete. No ads. | Account for everyone invited. Web app and some recipe features are paid. Heavy next to ours. | Smaller on purpose. No account in version 1. |
| Bring! (Direct, leader by reach) | Visual tiles, shared list, offers and recipes | Largest reach. Easy to scan. | Ads and offers. Lowest Google Play rating of the group (4.1). User reviews report unwanted auto-picks and a name-overwrite bug. | Duplicate names are allowed ([UC-01](#uc-01)). |
| OurGroceries (Direct, challenger) | Shared list by category or aisle, with barcode and photo add | Whole feature set is free. | Ads. A March 2026 review says an ad looked like an item added by a household member. | No ads. |
| BuyBye! (Direct, startup) | One list from a link, no sign-up, works offline | No sign-up. | Newest. Every fact comes from its own site and article. | **Not unique on "no account"**. |
| Google Keep (Indirect, leader of general notes) | A checklist note, shared | Free. Everywhere. | No categories. Collaborators need a Google account. | Purpose-built status and filter. |
| Apple Reminders (Indirect, niche) | A Groceries list type that sorts into categories by itself | Free and pre-installed. Siri voice add. | Sharing needs an Apple Account with iCloud. Pages read describe only iPhone. | Works in any browser. Simpler. |
| Microsoft To Do (Indirect, challenger) | `[gap: only the Google Play headline was read]` | Named by the client. 482K reviews. | No grocery feature described in anything read. | `[gap: cannot compare]` |
| Todoist (Indirect, challenger) | Groceries as a shared task project | Very large user base. Typed or spoken capture. | Built for tasks, not groceries. Shared use needs Pro. | Simpler. Free of a paid tier. |

The status filter, undo of a purchase, edit, and confirmed delete were found described for **no** competitor. That is a gap in the reading, not proof of a difference. `[gap: needs a hands-on pass]`

---

## 13. UX and Branding Requirements

- No brand guidelines and no existing design system. Use a clean, neutral design, clear typography, and simple controls. `[discovery-1]`
- Purchased is a checkbox. `[discovery-1]` The purchased state must be clearly different from To Buy (Adopt, [INS-002](../research/insight-decision-record.md#ins-002)). `[assumed]` `[stakeholder-adjusted]`
- Editing happens in a separate small form or modal. No complex inline editing in version 1. `[discovery-1]`
- An empty list shows a short message, such as "Your shopping list is empty", and a clear Add Item action. `[discovery-1]`
- A filter with no matching items shows a message that there are no matching items. `[discovery-1]`
- Deleting an item requires confirmation. `[discovery-1]`
- Weekly shopping and quick top-up shopping use the same workflow. No separate modes. `[discovery-1]`
- The interface word for the completed state is Purchased. `[discovery-1]`

Expected patterns from the market, as signals only (Adopt, [INS-007](../research/insight-decision-record.md#ins-007)). Not requirements until a hands-on audit. `[assumed]` `[stakeholder-adjusted]`

- A shared list shows other people's changes without a refresh.
- Check-off is a single tap, and the checked state is clearly different.
- Adding an item is one field, with no sign-up wall in front of it.
- The list is free of ads and promotions in the core view.

Autocomplete is optional for design. Voice stays out of version 1 (Defer, [INS-011](../research/insight-decision-record.md#ins-011)). `[stakeholder-adjusted]`

---

## 14. Open Questions and Gaps

### Unanswered Questions

1. **What page-load and save-time targets should version 1 meet?** — Answered on 2026-10-19. Page load and save each complete within 3 seconds. See Section 7. `[operator-4]`
2. **How many users and items should the system support?** — Answered on 2026-10-19. 10 users and 200 items. See Section 7. `[operator-4]`
3. **How is access restricted without accounts?** — Answered on 2026-10-19. No accounts for the minimum viable product. No sign-in locally. One shared environment password on the cloud test environment ([C-09](#c-09)). Anyone with access to the list, through a shared link, can see the shopper's progress ([PP-NEW-2](#pp-new-2)). `[operator-2]` `[operator-5]` `[operator-6]`
4. **Do any standard security requirements apply?** — Answered on 2026-10-19. HTTPS. No other standard was named. See [C-10](#c-10). `[operator-4]`
5. **What are the final API validation details?** — Confirmed on 2026-10-19. The server is the authority and trims the name. A failed check returns 400 with every failing field. A missing item returns 404. A storage failure returns a 5xx status. See [C-08](#c-08) and [D-06](../meeting-notes/2026-10-19-entity-gaps-decisions.md). `[operator-2]` `[operator-6]`
6. **Which browser versions must work, and what hosting constraints apply?** — Browsers answered on 2026-10-19: all modern Chromium-based browsers. See [C-02](#c-02). Hosting constraints beyond Azure database backups and a possible Azure DevOps pipeline are deferred to architecture vision. The team and the stakeholder approved the product requirements document with that deferral on 2026-10-19. `[operator-4]` `[operator-7]`
7. **What continuous integration and deployment process is used, and which environments exist beyond local development and a test environment?** — Deferred to architecture vision on 2026-10-19. Continuous integration is not selected. Azure DevOps pipelines are under consideration. Environments beyond local development and a cloud test environment were not stated. `[operator-4]` `[operator-7]`
8. **How is data persisted and backed up so it remains after a restart or redeployment?** — Answered on 2026-10-19. Azure database backups. An application upgrade does not remove existing data. See [C-05](#c-05). `[operator-4]`
9. **Should a repeated line be allowed silently, warned about, or blocked?** — Answered on 2026-10-16. Duplicate names are allowed. A matching name does not warn and does not block. Affects [UC-01](#uc-01) and [PP-NEW-1](#pp-new-1). `[operator]`
10. **Does [C-02](#c-02) stand if the list is mostly used in the shop on a phone?** — Answered on 2026-10-19. The browser covers desktop, tablet, and phone. A native mobile application stays out of this release. `[operator-3]`

### Thin Sections

Section 7 has a 3-second target and a limit of 10 users and 200 items. Availability and accessibility are deferred to architecture vision. Section 4 has no numeric targets and no baselines. Section 12 is filled from public pages; Microsoft To Do is a gap in the reading.

### Contradictions

[UC-01](#uc-01) allows duplicate names. The operator confirmed that on 2026-10-16. [PP-NEW-1](#pp-new-1) stays a simulated candidate pain (Defer, [INS-008](../research/insight-decision-record.md#ins-008)). It does not change the rule.

### Missing Stakeholder Input

1. **Wireframe review** — Closed on 2026-10-19. The team and the stakeholder approved the product requirements document, including Section 13. `[operator-7]`
2. **Stakeholder walk of the product requirements document** — Closed on 2026-10-19. The team and the stakeholder approved. `[operator-7]`
3. **Has the architect confirmed that this MVP cut is technically feasible?** — Closed on 2026-10-15. The operator said the team and the stakeholder approved the minimum viable product boundary. No feature moved in or out. `[feature-tree]`

### Validation Needs (by priority)

1. **[A-01](#a-01) to [A-06](#a-06)** — Deferred. Real interviews are not in this discovery phase. `[operator-7]`

---

## 15. Version History

| Version | Date | Author | What changed |
|---|---|---|---|
| v1.0 | 2026-10-01 | Liliia | Initial draft from the brief and the 22 September 2026 discovery meeting |
| v1.1 | 2026-10-12 | Designer | Research update from the finalized [research synthesis](../research/research-synthesis.md) and [insight decision record](../research/insight-decision-record.md). Operator accepted the proposed delta ([2026-10-12-stakeholder-research-review.md](../meeting-notes/2026-10-12-stakeholder-research-review.md)). Claims stay `[assumed]`. |
| v1.2 | 2026-10-15 | Liliia | Section 6 records the operator's MVP and Future tags. No v1.1 tag. |
| v1.3 | 2026-10-15 | Liliia | The operator said the team and the stakeholder approved the minimum viable product boundary. No scope change. |
| v1.4 | 2026-10-15 | Liliia | Section 5 links each version-1 use case to its flow. No scope change. |
| v1.5 | 2026-10-16 | Liliia | The flow set and the business-rules catalog were rewritten from sources. Section 5 links stay on the same flow files. No scope change. |
| v1.6 | 2026-10-16 | Liliia | Section 14 question 9 is answered. Duplicate names stay allowed, with no warning and no block. |
| v1.7 | 2026-10-19 | Assistant, approved by the operator | [C-08](#c-08) and [C-09](#c-09) closed by the operator during entity enrichment. Section 14 question 5 answered, question 3 partly answered. No scope change. |
| v1.8 | 2026-10-19 | Liliia | Section 14 question 10 is answered. [C-02](#c-02) covers a desktop, tablet, and phone browser. [R-01](#r-01) is closed. |
| v1.9 | 2026-10-19 | Liliia | Section 14 questions 1, 2, 4, 6, 7, and 8 answered or partly answered. Question 5 stays on the recorded API decision until the operator confirms it. |
| v1.10 | 2026-10-19 | Liliia | [C-10](#c-10) is HTTPS only. User authentication was removed. |
| v1.11 | 2026-10-19 | Liliia | Anyone with access to the list, through a shared link, can see the shopper's progress. |
| v1.12 | 2026-10-19 | Liliia | Question 5 confirmed. No accounts for the minimum viable product. |
| v1.13 | 2026-10-19 | Liliia | Frozen. The team and the stakeholder approved. Open items that remain are deferred to architecture vision. |

---

## 16. Sources

| Marker | Source | Link |
|---|---|---|
| `[RFP]` | 1- Shopping List project - input.md | [1- Shopping List project - input.md](../START-HERE-requirements/text/1-%20Shopping%20List%20project%20-%20input.md) |
| `[discovery-1]` | 2026-09-22-initial-meeting.md | [2026-09-22-initial-meeting.md](../meeting-notes/2026-09-22-initial-meeting.md) |
| `[discovery-2]` | 2026-10-12-stakeholder-research-review.md | [2026-10-12-stakeholder-research-review.md](../meeting-notes/2026-10-12-stakeholder-research-review.md) |
| `[assumed]` | Belief stated in research and not validated. Simulated interviews. | [research-synthesis.md](../research/research-synthesis.md) |
| `[stakeholder-adjusted]` | Accepted or left unchanged at the 3.4 review | [2026-10-12-stakeholder-research-review.md](../meeting-notes/2026-10-12-stakeholder-research-review.md) |
| `[feature-tree]` | feature-tree.md | [feature-tree.md](feature-tree.md) |
| `[operator]` | Operator, 2026-10-16 | [2026-10-16-flows-and-rules-review.md](../meeting-notes/2026-10-16-flows-and-rules-review.md) |
| `[operator-2]` | Operator, 2026-10-19 | [2026-10-19-entity-gaps-decisions.md](../meeting-notes/2026-10-19-entity-gaps-decisions.md) |
| `[operator-3]` | Operator, 2026-10-19, section 14 question 10 | — |
| `[operator-4]` | Operator, 2026-10-19, section 14 questions 1, 2, 4, 6, 7, and 8 | — |
| `[operator-5]` | Operator, 2026-10-19, who can see the shopper's progress | — |
| `[operator-6]` | Operator, 2026-10-19, questions 3 and 5 confirmed | — |
| `[operator-7]` | Operator, 2026-10-19, team and stakeholder approval | — |
| `[gap: …]` | Not in any source | — |

---

## Companion Artifacts

> [feature-tree.md](feature-tree.md)
>
> [flows/index.md](flows/index.md)
>
> [business-rules-catalog.md](business-rules-catalog.md)
>
> [SHOPPING_LIST](../domain/erd/entities/SHOPPING_LIST.md), [ITEM](../domain/erd/entities/ITEM.md)
>
> [research-synthesis.md](../research/research-synthesis.md), [insight-decision-record.md](../research/insight-decision-record.md), [personas.md](../research/personas.md), [competitive-analysis.md](../research/competitive-analysis.md)
