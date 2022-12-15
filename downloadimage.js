const puppeteer = require("puppeteer");

saveImage = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 1 });
    await page.goto("https://www.wikipedia.org/");

    const image = await page.waitForSelector('img[src][alt="Wikipedia"]')
    const imgURL = await image.evaluate(img => img.getAttribute('src'))
    const pageNew = await browser.newPage()

    const response = await pageNew.goto("https://www.wikipedia.org/" + imgURL, {timeout: 0, waitUntil: 'networkidle0'})
    const imageBuffer = await response.buffer()
    await fs.promises.writeFile('./logo.png', imageBuffer)
    await browser.close()
}

saveImage();