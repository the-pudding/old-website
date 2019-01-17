# The Pudding

All scripts to generate and update our home page, archive page, about page, author pages, RSS feed, and footer widget.

## Requirements

- [node](https://nodejs.org)
- [gulp](https://gulpjs.com/)
- [AWS CLI](https://aws.amazon.com/cli/)

## Installation

Clone this repo and run `npm i`

## Development

- Run `gulp` to start to server + Stylus live reload
- Run specific scripts in `package.json`

#### HTML

All modifications to HTML should go in the `templates` directory. This is used
to generate the `index.html` files in `dev` (**DO NOT MODIFY** `index.html`
files, any direct modifications will be overwritten on subsequent builds).

#### CSS

All modifications should go in the `styles` directory. The Stylus is compiled to CSS which is output in the `dev/common/css` folder.

#### JS

All modifications should go in the `templates` JS files, for example `templates/home/entry.template.js`).

## Data and Copy

- [data: google sheet](https://docs.google.com/spreadsheets/d/157mDBFAmsOdkO9f7RgUSgrQm1dzrpB9V3nN5-cEIQN0/edit#gid=0)
- [about page: google doc](https://drive.google.com/open?id=1TRc-grkFei5z0JGVULkgRRV5dy4QU5-F1Lhh-Vd11mU).

All other copy should be made in the HTML in the `templates` directory.

### Adding a new story

- Add 640x320 jpg to `dev/common/assets/story-thumbnails`
- `npm run start`
- `npm run dist`
- `make live` (need amazon CLI setup)
