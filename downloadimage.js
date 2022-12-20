const puppeteer = require("puppeteer");
const fs = require('fs');

saveImage = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 1 });
    await page.goto("https://officesnapshots.com/2022/12/07/algorand-offices-boston/");
    await page.evaluate(() => {
        window.scrollTo(0, window.document.body.scrollHeight);
      });

    const image = await page.waitForSelector('.gallery-item.product-test.normal-mode img[src]', {timeout: 0, waitUntil: 'networkidle0'})
    const imgURL = await image.evaluate(img => img.getAttribute('data-src'))
    const pageNew = await browser.newPage()

    const response = await pageNew.goto(imgURL, {timeout: 0, waitUntil: 'networkidle0'})
    const imageBuffer = await response.buffer()
    
    await fs.promises.writeFile('./logo1.png', imageBuffer)
    await browser.close()
}

saveImage();