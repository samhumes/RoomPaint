# RoomPaint v2.1 — Android-friendly prototype

RoomPaint is a first working prototype for previewing paint colours on a photo of your room.

## Included in this prototype
- Upload a photo from the phone gallery or use the camera where supported.
- Tap-to-select connected areas of similar colour with a more visible wall-selection control; adjust tolerance for more/less coverage.
- Use the brush to add coverage manually and the eraser to correct spills.
- Preview a curated starter palette with Dulux, Valspar, Farrow & Ball, Crown, Little Greene and RoomPaint custom shades.
- Search/filter shades, tune colour strength and compare the original with the preview.
- Save favourite shades on this device and export a PNG preview.

## Important catalogue note
This is a prototype palette. Shade names are examples to help test the experience; most hex values are illustrative screen values and are **not verified official manufacturer colour standards**. Before a public launch, replace the starter entries with a checked catalogue, permitted product data, exact references and manufacturer-approved digital values where available. Do not imply endorsement by the paint brands.

## How to run it on Android
### Quick preview
Open `index.html` in a modern browser. Depending on Android/browser security restrictions, camera access and install features work best when hosted over HTTPS.

### Installable home-screen app
1. Upload these files to a static HTTPS host (for example GitHub Pages or Netlify).
2. Open the hosted URL in Chrome on your Android phone.
3. Open Chrome's menu and choose **Install app** or **Add to Home screen**.

This is an installable web-app prototype (PWA), not yet a signed APK from Google Play.

## Architecture recommendation for a production Android app
- **Client:** React Native with Expo (or Kotlin if native-only is preferred).
- **Image pipeline:** native-resolution photo import; downsampled editing proxy; mask layer stored separately from the photo.
- **Wall selection:** on-device segmentation model or a segmentation API, with manual brush/erase correction as fallback. The current prototype uses a manual mask.
- **Rendering:** GPU shader or native image-processing pipeline that blends the paint colour while retaining luminance/texture. Keep a separate mask and support undo/redo.
- **Catalogue:** structured shade database with brand, collection, shade name, official code, source URL, RGB/Lab values, finish and verification date. Confirm licensing/permissions for any third-party data.
- **Persistence:** local-first project storage; optional cloud sync only if desired.
- **Testing:** compare digital previews with physical sample cards under daylight and artificial lighting; always label screen previews as approximate.

## Known limitations
- Tap-to-select is colour-based region selection, not semantic AI wall recognition; complex walls, shadows and nearby similar-coloured surfaces may still need manual correction.
- No pinch zoom, perspective correction or undo/redo yet. Tap-to-select can add multiple connected areas to the same mask.
- The current rendering modes are simple pixel blends, not a physically calibrated paint simulation.
- Shade catalogue is small and illustrative.
- Saved favourites use browser local storage. Exported images contain the current visible canvas.
