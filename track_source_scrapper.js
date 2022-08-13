const scrape_track_source = async (browser, tracks) => {
  const tracksWithSource = [];
  for (const track of tracks) {
    const trackPage = await getPage(browser, track.trackUrl);
    const trackSource = await getTrackSource(trackPage);
    await trackPage.close();
    tracksWithSource.push({ ...track, sources: trackSource });
  }
  return tracksWithSource;
};

const getTrackSource = async (page) => {
  const sources = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".btn-download")).map((x) => [
      x.innerHTML.trim().substring(0, 8),
      x.href,
    ])
  );
  return Object.fromEntries(sources);
};

const getPage = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForNetworkIdle();
  return page;
};

export { scrape_track_source };
