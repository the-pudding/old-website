# The Pudding

All scripts to generate and update our home page, archive page, about page, author pages, RSS feed, and footer data.

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

See [here](https://www.notion.so/thepudding/Data-and-Copy-7cb246a38ddc4b8883651b21dc06746e) for piped in content documents. All other copy should be made in the HTML in the `templates` directory.

### Publishing a Story

See [here](https://www.notion.so/thepudding/Publish-A-New-Story-c847b223ad814599a679b41dea6281a0) for instructions.

Thank you !
Please visit again.
