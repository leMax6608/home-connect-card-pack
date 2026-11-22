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
- `washer-compact.png`
- `washer-expanded.png`

After adding both oven images, enable its prepared block in the repository's main `README.md` by removing the surrounding HTML comment markers. The compact image stays visible and the expanded image sits inside a collapsible `<details>` section.

Use the same browser zoom level for both states. The main README constrains both compact and expanded screenshots to 552 pixels so source images with different resolutions are displayed consistently. Prefer tightly cropped screenshots without personal information, hostnames, IP addresses, location names, or unrelated dashboard content.

Use absolute `https://raw.githubusercontent.com/leMax6608/home-connect-card-pack/main/docs/images/...` URLs for image sources in the main README. Relative HTML image paths do not resolve correctly when HACS displays the README. Keep the fixed display widths and collapsible detailed views when replacing screenshots. HACS reads documentation from the selected release, so README fixes must be included in a new release to reach those users.

The overview (`cards-preview.png`) renders all five compact cards with the same theme, dimensions and example data. To regenerate it, build the bundle, serve the repository locally, open `docs/images/cards-preview.html` at 100% zoom, and capture the `main` element at 2× resolution. The preview page loads Material Design Icons from jsDelivr. The individual gallery images can be replaced independently. Keep the logo and at least one screenshot in the repository for HACS validation.

`logo.png` is the original, brand-neutral repository logo. Keep the transparent outer canvas intact when deriving smaller icon sizes.
