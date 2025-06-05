# VZone

VZone is a small HTML5 canvas arcade game made up of two simple modes:

- **Esquive** – dodge the falling obstacles as long as possible.
- **SafeZone** – stay inside the moving safe circle until the timer is full.

The project is intentionally lightweight: all of the logic lives in plain
JavaScript files with no build step. Open the game in a browser or start a
basic static server to play locally.

## Controls

- **Keyboard:** use the arrow keys (or `ZQSD`/`WASD`) to move the player.
- **Touch/Mouse:** drag on the canvas to move.
- **Pause/quit:** use the on‑screen buttons.

For the best experience on mobile devices, rotate your phone to **landscape**
mode before playing. The interface is designed around a wide canvas and
landscape orientation gives more room for touch controls.

## Running the game

Because VZone is a purely static web page, no compilation is required.
Simply serve the repository directory with any HTTP server and open
`index.html` in your browser. Examples:

```bash
# Using Python
python3 -m http.server

# Or using Node
npx serve .
```

Then visit `http://localhost:8000` (or the port printed by the server) and start playing.

## Translations

Internationalisation is handled through small language modules. All files
reside under [`js/lang`](js/lang) and each module registers its strings via
`registerTranslations(lang, data)`. For example [`fr.js`](js/lang/fr.js)
provides French text.

Supported languages are listed in [`js/vzone_i18n.js`](js/vzone_i18n.js)
inside the `supportedLangs` array. Each language file must be referenced in
`index.html` with a `<script>` tag so it gets loaded by the browser. The
language selector is automatically populated from `supportedLangs` when the
page loads.

To add a new translation:

1. Create `js/lang/<code>.js` and call `registerTranslations('<code>', {...})`.
2. Include the new file in `index.html`.
3. Add the language code to `supportedLangs` if it isn't already listed.

Once a file is loaded, selecting the language from the drop‑down will update
all interface text.
