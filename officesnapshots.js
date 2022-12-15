const puppeteer = require("puppeteer");
async function getLinks(){
  const browser = await puppeteer.launch({
    args: [
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ],
      headless: false
    });
  const page = await browser.newPage();
  page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 1 });
  await page.goto("https://officesnapshots.com/");
  const links = await page.$$eval(".storylink", (allAs) => allAs.map((a) => a.href));
  await browser.close();
  return links;
};

async function getFunctionData(url,page) {
  await page.goto(url);
  const h1 = await page.$eval(".title.no-blurb", (h1) => h1.textContent);
  const firm = await page.$eval(".firm.detail-section", (firm) => firm.textContent);
  const size = await page.$eval(".size.detail-section",(size) => size.innerText);
    return {
      title: h1,
      firm: firm,
      size: size
    };

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