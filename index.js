import { launch } from "puppeteer";
import { ask, getAlbumlink, getYear } from "./prompt.js";
import { scrape_abmums_by_year } from "./album_by_year_scrapper.js";
import { scrape_album_info } from "./album_info_scrapper.js";
import {
  downloadAlbum,
  getAlbumDetailsFilesByYear,
  getLatestAlbumListFileOfYear,
  getJsonFileContent,
} from "./fs.js";

const getAlbumListByYear = async () => {
  const year = await getYear();

  const browser = await launch({ headless: false });

  console.log("Getting albums of --> ", year);
  await scrape_abmums_by_year(year, browser);

  await browser.close();
};

const getAllAlbumDetailsByYear = async () => {
  const year = await getYear();
  const albumsListFile = await getLatestAlbumListFileOfYear(year);
  if (albumsListFile === undefined || albumsListFile === "") {
    console.log(`Get Album List of ${year} First`);
    return;
  }
  console.log(`Album list found, latest file at ${albumsListFile}\n`);
  const albumsList = await getJsonFileContent(albumsListFile);

  const browser = await launch({ headless: false });
  for (const album of albumsList) {
    console.log(`\n---> Starting to scrape ${album.albumPage} <---`);
    await scrape_album_info(year, album.albumPage, browser);
    console.log(`---> Finished scrape of ${album.albumPage} <---\n`);
  }

  await browser.close();
};

const getSingleAlbumDetails = async () => {
  const year = await getYear();
  const albumPage = await getAlbumlink();

  const browser = await launch({ headless: false });

  console.log(`\n---> Starting to scrape ${albumPage} <---`);
  await scrape_album_info(year, albumPage, browser);
  console.log(`---> Finished scrape of ${albumPage} <---\n`);

  await browser.close();
};

const downloadFullAlbumsByYear = async () => {
  const year = await getYear();
  const albumDetailsFiles = await getAlbumDetailsFilesByYear(year);
  if (albumDetailsFiles.length === 0) {
    console.log(`Get Album Details of ${year} First`);
    return;
  }

  for (let albumDetailsFile of albumDetailsFiles) {
    const albumDetails = await getJsonFileContent(albumDetailsFile);
    console.log(`\n---> Starting to download ${albumDetails.albumName} <---`);
    await downloadAlbum(albumDetails, year);
    console.log(`---> Finished download of ${albumDetails.albumName} <---\n`);
  }
  console.log("All done !");
};

const res = await ask();
switch (res) {
  case 1:
    getAlbumListByYear();
    break;
  case 2:
    getAllAlbumDetailsByYear();
    break;
  case 3:
    downloadFullAlbumsByYear();
    break;
  case 4:
    getSingleAlbumDetails();
    break;
  default:
    console.log("Use with caution");
}
