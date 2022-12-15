const puppeteer = require ("puppeteer");

nextButton = async () => {

    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    await page.goto("https://officesnapshots.com/");
    const secondToWait = (Math.floor(Math.random() * 6 ) + 2) * 1000
    const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

    while(await page.$(".pagination.desktop .nav-next a")) {
      await page.click(".pagination.desktop .nav-next a");

      await page.waitForSelector(".pagination.desktop .nav-next a")
      await delay(secondToWait);
    }
    await browser.close();
};

nextButton();