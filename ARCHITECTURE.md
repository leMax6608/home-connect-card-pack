# Architecture

## Goals and constraints

The implementation favors usability, Home Assistant-native integration, performance and maintainability in that order. Four cards share one rendering and service core while their differences live in declarative definitions.

```text
Card/editor registration
        │
        ├── appliance definition (roles, domains, labels, aliases)
        │           ├── dishwasher
        │           ├── oven
        │           ├── coffee
        │           └── dryer
        │
        ├── BaseApplianceCard ── shared Lit components ── HA services
        │
        └── BaseApplianceEditor ── HA entity picker ── entity registry discovery
```

## Configuration

`BaseApplianceCardConfig` contains only universal concepts. `DishwasherCardConfig`, `OvenCardConfig`, `CoffeeCardConfig` and `DryerCardConfig` extend it with appliance roles. This preserves autocomplete and avoids one oversized configuration interface.

The IDs in `examples.yaml` are examples, never runtime defaults. Rendering is driven only by the user's configuration.

## Declarative device definitions

Each definition supplies metadata and a list of fields:

- config key and visual-editor label
- section (`general`, `program`, `actions`, `options`, `status`, `settings`)
- UI control type
- allowed HA domains
- discovery aliases
- warning/prominence flags

Adding a function usually requires a definition entry and a typed config property, not duplicated card/editor markup.

## Rendering and performance

- Lit preserves DOM nodes across updates.
- `shouldUpdate()` compares only configured entity object references when `hass` changes.
- Derived state is computed synchronously from the small configured set.
- There is no polling, timer-driven state, external request, or animation loop.
- Expand/collapse uses `grid-template-rows`; progress and switches use CSS transforms.
- Container queries adapt each card to its actual Lovelace column width instead of the browser viewport.
- `getGridOptions()` supplies a six-column default and three-column minimum to Home Assistant Sections dashboards while leaving vertical sizing content-driven.
- Service locks update only a small `Set` and prevent repeated calls per entity.

## Localization

Fixed UI copy and all device-field labels use the Home Assistant language. Version 1.1 ships English plus German and keeps English as the safe fallback. Entity values continue to prefer Home Assistant's own formatter; common raw Home Connect enum values receive a localized fallback.

## Discovery

The editor requests the Entity Registry only after the user explicitly chooses discovery. It resolves the anchor's `device_id`, limits candidates to that device, filters disabled entries, applies domain constraints and then scores role aliases. A candidate is used at most once. Scores below the confidence threshold are not assigned.

Names remain a secondary signal inside a registry-confirmed device boundary, never a global fuzzy search. Existing configuration is immutable from discovery's perspective.

The card picker uses conservative appliance-name matching before suggesting a card for an entity. Suggested configurations contain the selected entity as their anchor, and the visual editor then performs the same device-registry-bounded discovery used for manual setup.

## Failure behavior

- Missing state object: the optional control is omitted.
- `unknown`/`unavailable`: status text is safe and interactive controls are disabled.
- Failed registry request: a notice appears in the editor; manual pickers continue to work.
- Failed service call: the card displays the error and releases its in-flight lock.
- Duplicate module loading: guarded custom-element registration avoids a fatal redefinition exception.

## Verification

Vitest regression suites cover state/enum formatting, warnings, duration/progress normalization, service routing and device-registry discovery. The production bundle is also rendered in local light/dark and wide/narrow browser fixtures during visual QA.

## Extension path

To add another appliance:

1. Extend the config union.
2. Add one definition.
3. Add thin card and editor subclasses.
4. Register imports and `window.customCards` metadata.

Shared UI or service behavior stays in the base classes/components.
