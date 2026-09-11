# Changelog

## 1.2.1

- Start all nested detail sections collapsed by default

## 1.2.0

- Add a compact animated progress bar to the collapsed card while a program is running or paused
- Remove the unsupported remaining-time role from the coffee machine card
- Remove the duplicate coffee machine power-state picker while retaining Status and Operating state
- Allow the selected anchor entity to fill its matching functional role during discovery
- Improve discovery scoring with domain priority and selected state attributes
- Add device-profile and anchor-reuse regression tests

## 1.1.1

- Hide stale progress, remaining time and active-program telemetry while an appliance is off
- Show the actual power state in the compact header when power is off
- Keep configured program, option, status and settings sections accessible while off
- Remove unsupported Pause and Resume roles from the dishwasher editor, discovery and runtime actions
- Prefer the selected program while idle and the active program while running

## 1.1.0

- Refined card surfaces, progress presentation, action hierarchy and responsive spacing
- Added per-card container queries for narrow Lovelace grid columns
- Added German UI localization with English fallback
- Fixed Home Connect enum state and warning classification
- Fixed initial native select values and alternative-domain control rendering
- Fixed editor discovery races and preservation of concurrent manual changes
- Allowed available button entities with an initial `unknown` state
- Added safe duplicate custom-element registration and stricter service validation
- Added regression tests for formatting, registry discovery and service dispatch

## 1.0.0

- Initial dishwasher, oven, coffee machine and dryer cards
- Shared responsive component system and contextual controls
- Native visual editors with registry-based entity discovery
- HACS metadata, examples, CI and release workflow
