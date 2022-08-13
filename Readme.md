# Audio Scrapper and Downloader

## Summary

Scrapes Bollywood audio album information from [PagalFree](pagalfree.com) by year, batch downloads them by Bitrate

> Developed for learning & experimental purpose only. Not intended to
> infringe and copyright. Use responsibly.

## How to Run

- Install Node.JS
- Clone this repository and open terminal on project folder
- Run command `npm install`
- Run command `npm run dev`
- Select appropriate action ( See next section for action explanation )

## Actions

- Get albums of a year
  - Provide a year between 1956 - Present Year
  - Generates a JSON with all the albums information released on that year available on [PagalFree](pagalfree.com)
- Get album details of a year
  - Provide a year between 1956 - Present Year
  - Uses the JSON generated in **_Get albums of a year_** stage to generate JSON file for each album
  - Album details JSON contains information for the album with download links for the tracks
- Download albums of a year
  - Provide a year between 1956 - Present Year
  - Select a Bit Rate
  - Uses **JSON files** generated in **_Get album details of a year_** stage to download the album
- Download album by link
  - Provide a year between 1956 - Present Year
  - Provide an album link from pagalfree.com. Ex: https://pagalfree.com/album/rockstar-2011.html
  - Generates JSON file for provided album

## Techs Used

- JavaScript as Primary Language
- Node.JS as Runtime
  - https://nodejs.org/en/
- Puppeteer for Automation
  - https://github.com/puppeteer/puppeteer
- Inquirer to Prompt
  - https://github.com/SBoudrias/Inquirer.js
- Node-Fetch to Download
  - https://github.com/node-fetch/node-fetch

## MIT License

Copyright (c) 2012-2022 Scott Chacon and others

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
