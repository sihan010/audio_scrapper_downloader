import { writeFile, readFile, readdir } from "fs/promises";
import { existsSync, mkdirSync, createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import fetch from "node-fetch";

const ALBUM_LIST = "./data/json/albums";
const ALBUM_DETAILS = "./data/json/album_details";
const ALBUMS = "./data/audio";

const createDirectory = (directory) => {
  const d = directory.replace(":", "");
  if (!existsSync(d)) {
    mkdirSync(d, { recursive: true });
  }
  return d;
};

const wrileAlbumCollection = async (year, albumCollection) => {
  const directory = createDirectory(`${ALBUM_LIST}/${year}`);
  const fileName = `${directory}/Albums_of_${year}_${Date.now()}.json`;
  await writeFile(fileName, JSON.stringify(albumCollection));
  console.log(`Album list of ${year} flushed to --> ${fileName}`);
  return fileName;
};

const wrileAlbumInfoCollection = async (year, albumInfoCollection) => {
  const directory = createDirectory(`${ALBUM_DETAILS}/${year}`);
  const fileName = `${directory}/${
    albumInfoCollection.albumName
  }_${Date.now()}.json`;
  await writeFile(fileName, JSON.stringify(albumInfoCollection));
  console.log(`Album Details flushed to --> ${fileName}\n`);
  return fileName;
};

const getLatestAlbumListFileOfYear = async (year) => {
  const directory = `${ALBUM_LIST}/${year}`;
  if (!existsSync(directory)) {
    return "";
  }
  const files = await readdir(directory);
  const filteredFiles = files.filter((x) => x.includes(`${year}`));
  if (filteredFiles.length > 0) {
    return `${directory}/${filteredFiles.pop()}`;
  } else return "";
};

const getAlbumDetailsFilesByYear = async (year) => {
  const directory = `${ALBUM_DETAILS}/${year}`;
  if (!existsSync(directory)) {
    return [];
  }
  const files = await readdir(directory);
  return files.map((x) => `${directory}/${x}`);
};

const getJsonFileContent = async (fileName) => {
  if (!existsSync(fileName)) {
    return null;
  }
  const raw = await readFile(fileName, {
    encoding: "utf8",
  });
  return JSON.parse(raw);
};

const downloadAlbum = async (album, year, bitRate = "128 Kbps") => {
  const albumDir = createDirectory(`${ALBUMS}/${year}/${album.albumName}`);

  // Download cover image
  try {
    const coverName = decodeURI(album.albumCover.split("/").pop());
    const result = await downloadFile(
      album.albumCover,
      `${albumDir}/${coverName}`
    );
    console.log(result);
  } catch (ex) {
    console.error(ex);
  }

  // Download Tracks
  for (const track of album.tracks) {
    const url = track.sources[bitRate];
    const filename = `${track.trackName}.${url.split(".").pop()}`;
    console.log("Downloading --> " + filename);
    try {
      const result = await downloadFile(url, `${albumDir}/${filename}`);
      console.log(result);
    } catch (ex) {
      console.error(ex);
    }
  }
};

const downloadFile = async (url, destination) => {
  const streamPipeline = promisify(pipeline);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Error while downloading --> ${response.statusText}\nURL: ${url}\nExpected location: ${destination}`
    );
  }

  await streamPipeline(response.body, createWriteStream(destination));
  return `Finished Downloading --> ${url}`;
};

export {
  wrileAlbumCollection,
  wrileAlbumInfoCollection,
  getAlbumDetailsFilesByYear,
  getLatestAlbumListFileOfYear,
  getJsonFileContent,
  downloadAlbum,
};
