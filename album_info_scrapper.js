import { wrileAlbumInfoCollection } from "./fs.js";
import { scrape_track_source } from "./track_source_scrapper.js";

const scrape_album_info = async (year, album_url, browser) => {
  const albumPage = await getPage(browser, album_url);
  const albumInfo = await getAlbumInfo(albumPage);
  await albumPage.close();
  const tractSources = await scrape_track_source(browser, albumInfo.tracks);
  console.log(`Album: Completed --> ${albumInfo.albumName}`);

  await wrileAlbumInfoCollection(year, {
    ...albumInfo,
    tracks: tractSources,
  });
};

const getPage = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForNetworkIdle();
  return page;
};

const getAlbumInfo = async (page) => {
  const info = await page.evaluate(() => {
    const albumName = document
      .querySelector(".album_page_content b")
      .innerText.trim();
    const albumCover = document.querySelector(".album_page_content img").src;
    const albumDetailsRaw = Array.from(
      document.querySelectorAll(".album_page_content .row")
    )
      .filter(
        (x) => x.querySelectorAll("div")[0].innerHTML.trim() !== "Share On"
      )
      .map((x) => {
        return [
          x.querySelectorAll("div")[0].innerHTML.trim(),
          x
            .querySelectorAll("div")[1]
            .innerHTML.trim()
            .split(",")
            .map((y) => y.trim()),
        ];
      });
    const albumDetails = Object.fromEntries(albumDetailsRaw);
    const tracks = Array.from(document.querySelectorAll(".list-song")).map(
      (x) => {
        const trackUrl = x.parentNode.href;
        const trackName = x
          .querySelector(".music-name")
          .innerHTML.trim()
          .split("  ")[0];
        const singer = x
          .querySelector(".music-singer")
          .innerHTML.trim()
          .split(",")
          .map((y) => y.trim());
        return { trackName, singer, trackUrl };
      }
    );

    return { albumName, albumCover, albumDetails, tracks };
  });
  return info;
};

export { scrape_album_info };
