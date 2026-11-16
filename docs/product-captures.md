# Product captures

Captured on 16 November 2026 from the released Linux v0.2.4 AppImage:

https://downloads.legalmasr.com/releases/v0.2.4/Legal-Masr_0.2.4_linux_x64.AppImage

Downloaded AppImage SHA-256:
`733a44c2cbb4e8367a1ce6e659da3ead3d32b6cf9a60f52530d4ea0797c91652`

The downloaded AppImage was extracted and its AppRun launched in an isolated
X11 desktop with separate XDG data, config and cache directories. Existing
application data was not used. The app binary and frontend were not modified.
The release's Tauri command interface created five fictional clients, five
initial cases, hearing dates, preparation tasks, fee agreements and payments.
Two additional cases and their hearings were saved through the actual forms.
The final demo profile contains five clients and seven cases.

## Assets

All assets are in `public/media/product/`:

- `dashboard-ar.webp`, `dashboard-en.webp`: actual Today view, 1440 × 1100.
  The English screen uses the app's own language switch; fictional record
  names remain in Arabic.
- `dashboard-ar-dark.webp`, `dashboard-en-dark.webp`: the same demo profile in
  the app's actual dark theme, selected in Settings → Display and calendar.
  The hero follows the website's resolved theme, including system preference
  changes and manual overrides. Its full-size link uses the matching asset.
- `new-case-ar.webp`: populated new-case form, 1440 × 1000.
- `schedule-hearing-ar.webp`: populated hearing dialog, 1440 × 1000.
- `case-with-hearing-ar.webp`: saved case with its next hearing, 1440 × 1000.
- `case-to-hearing-ar.mp4`: approximately 45 seconds, H.264, 1440 × 1000.
  Records real native-app interaction: select client, enter case details,
  save, add the next hearing, then view the saved record. No audio.
- `demo-ar.vtt`, `demo-en.vtt`: timed descriptions of the three workflow steps.

Screenshots were saved from the native WebKit view and converted to lossless
WebP without retouching. The video was recorded directly from the isolated
X11 display. All client names, case references, hearing dates and monetary
records are fictional. The homepage labels this explicitly. The developer's
public support information in the app footer is part of the released UI.

The hero image links to its full-size asset. The video does not autoplay and
uses `preload="none"`; viewers can choose Arabic or English captions. The
English website uses the English dashboard screenshot, while the demo video
shows the Arabic workflow in both languages.
