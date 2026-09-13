# Changelog

## 1.6.0

- Add optional, fully manual display names for every program reported by the configured program entities
- List available program options in a collapsed editor panel without generating aliases automatically
- Apply manual names consistently to the program selector, compact header and active-program summary
- Keep service calls bound to the unchanged original Home Assistant option value
- Preserve custom mappings in copied YAML and show mappings that are temporarily absent from the entity options
- Add regression tests for program-name display, fallback behavior and YAML serialization

## 1.5.1

- Remove the unavailable-entity count from the compact card header
- Keep the expanded unavailable-entity diagnostic and affected entity IDs without displaying a count

## 1.5.0

- Add a five-second two-tap safeguard before sending Cancel commands, enabled by default
- Add configurable per-card accent colors with safe fallback to each appliance theme
- Make every read-only status row open Home Assistant's native More Info dialog
- Use Home Assistant's official `hass-action` event for More Info interactions
- Automatically run entity discovery when an editor receives an anchor from YAML or an entity suggestion
- Add card-picker suggestions for matching appliance entities on supported Home Assistant versions
- Add native sizing hints for Sections dashboards and a direct documentation link in the card picker
- Add a dismiss button to service error messages
- Align card-picker stub configurations with Home Assistant's custom-card API
- Add regression tests for safe accent colors and appliance entity suggestions

## 1.4.0

- Add editor buttons to copy paste-ready YAML and a privacy-conscious entity discovery report
- Open Home Assistant's More Info dialog by clicking the appliance identity in the card header
- Keep the metrics and chevron area dedicated to expanding and collapsing card details
- Warn in both compact and expanded views when configured entities are missing or unavailable
- Add regression tests for configuration export, diagnostic reports and unavailable-entity detection

## 1.3.0

- Add auto-detected dishwasher warnings for filter-system checks and triggered AquaStop events
- Keep the existing machine-care filter role distinct during automatic entity discovery
- Add a README preview image required by HACS default-repository validation
- Use a canonical, attributable MIT license and package metadata for license detection
- Add an explicit unofficial-project and trademark notice
- Recommend Home Connect Local while documenting compatibility with alternative integrations
- Add prepared screenshot slots and a transparent generative-AI disclosure to the documentation

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
