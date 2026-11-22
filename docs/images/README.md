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

The project preview (`cards-preview.svg` / `cards-preview.png`) shows all five appliances. The washer images are browser captures of the actual card with sample data. The dishwasher, coffee machine and dryer use Home Assistant screenshots from earlier versions, and the oven uses an illustration. When replacing a compact screenshot used in the overview, render `cards-preview.svg` to `cards-preview.png` again so the overview reflects the new image. Keep the logo and at least one screenshot in the repository for HACS validation.

`logo.png` is the original, brand-neutral repository logo. Keep the transparent outer canvas intact when deriving smaller icon sizes.
