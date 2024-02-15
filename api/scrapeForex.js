const cheerio = require('cheerio')
const forexData = require('../data/forexData')
const { default: axios } = require('axios')
const fs = require('fs')


const scrapeForex = async () => {
    if (forexData.value === 0.0) {
        const response = await axios.get('https://www.curs-valutar-bnr.ro/curs-valutar-banci/unicredit-bank')
        const $ = cheerio.load(response.data)
        const data = $('.currency-table').find('tbody').find('tr').first().find('td').text().split(' ')[1].replace(',', '.').replace('RON', '')
        forexData.setValue(parseFloat(data))
    }
}

module.exports = scrapeForex