const puppeteer = require("puppeteer");

async function getFunctionData(url,page) {

  await page.goto(url);

  const h1 = await page.$eval(".product_main h1", (h1) => h1.textContent);
  const price = await page.$eval(".price_color", (price) => price.textContent);
  const instock = await page.$eval(".instock.availability",(instock) => instock.innerText);
 

  return {
    title: h1,
    price: price,
    instock: instock
  };

};
getFunctionData();

async function getLinks(){
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 1 });
  await page.goto("http://books.toscrape.com/");
  const links = await page.$$eval(".product_pod .image_container a", (allAs) =>
    allAs.map((a) => a.href)
  );
  await browser.close();
  return links;
};

async function main(){

  const allLinks = await getLinks();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const scrapeData = [];

  for (let link of allLinks) {
    const data = await getFunctionData(link, page);
    const secondToWait = (Math.floor(Math.random() * 6 ) + 2) * 1000
    const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

    await delay(secondToWait);

    scrapeData.push(data);
    console.log(scrapeData);
  }

  await browser.close();
};

main();
