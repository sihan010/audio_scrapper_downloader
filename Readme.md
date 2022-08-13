# Audio Scrapper and Downloader

## Summary

Scrapes Bollywood audio album information from [PagalFree](pagalfree.com) by year, batch downloads them by Bitrate

> Developed for learning & experimental purpose only. Not intended to
> infringe and copyright. Use responsibly.

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
