const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const forexData = require('../data/forexData')


const scrapeForex = async () => {
    if (forexData.value === 0.0) {

        const browser = await puppeteer.launch({ headless: "new" })
        const page = await browser.newPage()
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36';
        page.setUserAgent(ua);
        await page.goto('https://www.unicredit.ro/ro/persoane-fizice.html#home', { waitUntil: 'networkidle0' })

        const $ = cheerio.load(await page.content())

        await browser.close()
        const data = $('#forex_amount').attr('data-sell')

        forexData.setValue(data)
    } else {
        const data = forexData.value
        console.log('Scraped from file')
    }
}

module.exports = scrapeForex