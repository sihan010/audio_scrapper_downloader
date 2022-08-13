import { wrileAlbumCollection } from "./fs.js";

const BOLLOYWOOD_BY_YEAR = "https://pagalfree.com/category/Bollywood/0";

const scrape_abmums_by_year = async (year, browser) => {
  let pageContent = null; // Store list of albums pages
  let nextPageUrl = `${BOLLOYWOOD_BY_YEAR}/${year}.html`; // Init with first page

  let albumCollection = []; // Stores all data

  do {
    // Execute at least once
    pageContent = await getPage(browser, nextPageUrl); // get the contents of the page
    const albums = await getAlbums(pageContent);
    console.log(
      `Completed --> ${nextPageUrl}\nFound--> ${albums.length} albums`
    );
    albumCollection.push(...albums);
    nextPageUrl = await hasNextPage(pageContent); // if more page then page url else empty string
    await pageContent.close(); // close current page
  } while (nextPageUrl !== "");

  wrileAlbumCollection(year, albumCollection); // flush to file
};

// gets page content, waits till full content is loaded
const getPage = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForNetworkIdle();
  return page;
};

// evaluate page content and get whatever we need
const getAlbums = async (page) => {
  const albums = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll("#album_page #category_content")
    ).map((x) => {
      const albumPage = x.querySelector("a").href.trim();
      const title = x
        .querySelector(".main_page_category_music_box h5 b")
        .textContent.trim();
      const artists = x
        .querySelector(".main_page_category_music_box div p")
        .textContent.trim()
        .split(",")
        .map((x) => x.trim());
      const albumCover = x.querySelector(
        ".main_page_category_music_box img"
      ).src;

      return {
        albumPage,
        title,
        artists,
        albumCover,
      };
    });
  });
  return albums;
};

// checks if we have next page, return s url of next page else empty string
const hasNextPage = async (page) => {
  const navigationOptions = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll("#album_page a.btn.btn-primary")
    ).map((x) => ({
      text: x.textContent.trim(),
      url: x.href,
    }));
  });
  for (let x of navigationOptions) {
    if (x.text === "Next") return x.url;
  }
  return "";
};

export { scrape_abmums_by_year };
