# Screenshot assets

Place real Home Assistant screenshots for the project README in this directory.

Recommended filenames:

- `dishwasher-compact.png`
- `dishwasher-expanded.png`
- `oven-compact.png`
- `oven-expanded.png`
- `coffee-machine-compact.png`
- `coffee-machine-expanded.png`
- `dryer-compact.png`
- `dryer-expanded.png`

After adding both images for an appliance, enable its prepared block in the repository's main `README.md` by removing that block's surrounding HTML comment markers. The compact image is then always visible; the expanded image is placed inside a collapsible `<details>` section. This lets each appliance be enabled independently.

Use the same browser zoom level for both states. The main README constrains both compact and expanded screenshots to 552 pixels so source images with different resolutions are displayed consistently. Prefer tightly cropped screenshots without personal information, hostnames, IP addresses, location names, or unrelated dashboard content.

The project preview (`cards-preview.svg` / `cards-preview.png`) places all four compact cards in one large vertical overview. The README also uses the individual real card screenshots for closer inspection. Keep the logo and at least one screenshot in the repository for HACS validation.

`logo.png` is the original, brand-neutral repository logo. Keep the transparent outer canvas intact when deriving smaller icon sizes.
