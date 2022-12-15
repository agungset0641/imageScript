const puppeteer = require("puppeteer");

booksToScrape = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 1 });
  await page.goto("http://books.toscrape.com/");
  // $$ artinya, cari semua element, kl $ cari element paling depan
  const links = await page.$$eval(".product_pod .image_container a", (allAs) =>
    allAs.map((a) => a.href)
  );
  console.log(links);

  await browser.close();
};

booksToScrape();