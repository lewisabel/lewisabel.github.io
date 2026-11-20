# Isabel Lew portfolio – how to edit

The site is plain HTML/CSS/JS and runs on GitHub Pages. **All content lives in `data/*.json`** –
edit a file, commit, push, and the page updates (GitHub Pages can take a minute or two).

```
index.html        page structure (rarely needs editing)
css/style.css     look and feel
js/main.js        builds the page from the data files
data/             <-- the files you edit
  projects.json   portfolio tiles + their popups
  fun.json        polaroids, "currently" list, ticket stub, fun fact
  about.json      cork-board notes
  bench.json      tools/components scattered on the portfolio bench
  site.json       name, email, links, resume path
assets/           images and the resume PDF
```

Tip: VS Code underlines JSON mistakes (missing comma, missing quote) as you type.
Keep each item inside `{ ... }` and put a comma between items (but not after the last one).

## Add a project (`data/projects.json`)

Copy any block, paste it where you want the tile to appear, and edit:

```json
{
  "title": "Modular DAQ PCBA",
  "company": "Until Labs",
  "skills": ["PCBA Design", "Firmware", "CAN"],
  "status": "done",
  "icon": "daq",
  "image": "assets/images/projects/modular-daq.png",
  "alt": "Modular DAQ base board",
  "blurb": "Short text shown on the back of the tile.",
  "description": "Longer text shown in the popup.",
  "bullets": ["First point", "Second point"]
}
```

| field | notes |
|---|---|
| `title`, `blurb`, `description` | text |
| `company` | shown at the top of the popup (leave `""` for none) |
| `skills` | shown on the front and back of the tile, joined with " / " |
| `status` | `"done"` = normal tile, `"soon"` = dashed "coming soon" tile |
| `icon` | tile sketch: `bms` `rob` `str` `ind` `gyr` `par` `daq` `tc` `car` `pz` |
| `image` | optional photo for the popup (falls back to the icon if missing) |
| `alt` | optional description of the image for screen readers |
| `bullets` | optional list shown in the popup |

Tiles appear in file order and are placed automatically in staggered rows (3, 2, 3, 2, ...);
the bench grows taller as you add tiles. To hand-place one tile, add any of
`"x"` (percent from left, 0–75), `"y"` (pixels from top) or `"rotate"` (degrees).

## Fun page (`data/fun.json`)
`polaroids` (each: `title`, `color` of the tape, `rotate`, optional `image`, `story`, `when`),
`currently` (label/value pairs), `ticket` (text under "ADMIT ONE"), `funFact`.
`split` is how many polaroids go on the left page.

## About page (`data/about.json`)
Each note: `title`, then `text` (a paragraph) or `items` (a bullet list), plus `color`, `pin`,
`rotate`, and `"wide": true` to make a note double width. The photo note and the UBC
card with the stamp are special and live in `index.html`.

## Bench (`data/bench.json`)
Each item: `type`, `left` or `right` (percent), `y` (percent of bench height) and `rotate`.
Types: `breadboard` `ruler` `pliers` `cutters` `screwdriver` `esp32` `multimeter` `dip` `ecap` `dcap`
`tweezers` `spool` `coin` `jumpers`, plus `resistor` (with `"bands": [4 hex colours]`) and
`led` (with `"color"`). With more tiles the bench gets taller, so add more items to fill it.

## Site details (`data/site.json`)
`name`, `subtitle`, `email`, `github`, `linkedin`, and `resume` (path to the PDF in `assets/`).

## Testing on your computer
Browsers block loading data files when you double-click `index.html`. Run a tiny local server
from the project folder instead, then open http://localhost:8000
```
python -m http.server 8000
```
(or use the VS Code "Live Server" extension). If a data file is missing or has a typo the page
shows a red message naming the file.

## Images
Folder and file names are case-sensitive on GitHub Pages (`me.jpg` is not `Me.JPG`).
