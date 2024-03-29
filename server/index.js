require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const connection = require('./api/connection');
const Recaptcha = require('google-recaptcha');
const secretKey = process.env.RECAPTCHA_SECRET
const recaptcha = new Recaptcha({ secret: secretKey });
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const history = require('connect-history-api-fallback');
const scrapeForex = require('./api/scrapeForex')
const forexData = require('./data/forexData')
const cron = require('cron');
connection();

app.use(express.urlencoded({ extended: true }));
app.use(history())
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

function extractNumbersFromString(str) {
    if(str.match(/\d+/g) !== null) return str.match(/\d+/g).map(Number);
}

app.get('/api/bikes', async (req, res) => {
    try {
        const tables = await process.postgresql.query(`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`);
        const bikes = {}
        for (const table of tables) {
            if (table.tablename.includes('_bikes') || table.tablename.includes('_scooters') || table.tablename.includes('_atv') || table.tablename.includes('_snowmobiles')) {
                const query = `SELECT * FROM ${table.tablename}`;
                const result = await process.postgresql.query(query);
                bikes[table.tablename] = result
            }
        }

        for (const bikeTypeIndex in bikes) {
            const bikeTypes = bikes[bikeTypeIndex]
            for (const bikeIndex in bikeTypes) {
                const bike = bikeTypes[bikeIndex]


                if (bike.bike_name.includes('\(') && bike.bike_name.includes('\)')) {
                    bike.bike_name = bike.bike_name.replace(/-\(.+\)/g, '').replace(/\d+(\/\d+)+/g, bike.capacitate)
                }

                if (bike.bike_name.includes(bike.main_year)) {
                    bike.bike_name = bike.bike_name.replace(bike.main_year, '')
                }

                if (bike.brand === 'utv') {
                    bike.brand = 'linhai'
                    bike.vehicle_type = 'utv'
                }

                if (bike.permis !== 'undefined' && bike.permis !== 'null' && bike.permis !== null && bike.permis !== undefined) {
                    const permisArray = bike.permis.split(" ").filter(item => item !== "")
                    bike.permis = permisArray
                } else {
                    bike.permis = []
                }

                if (bike.rabla !== 'undefined' && bike.rabla !== 'null' && bike.rabla !== null && bike.rabla !== undefined) {
                    bike.rabla = bike.rabla.toUpperCase()
                } else {
                    bike.rabla = null
                }


                bike.gallery = bike.gallery.replace(/[{}]+/g, "").replace(/\"+/g, "").split(",")
                if (bike.capacitate !== "null" && typeof bike.capacitate === "string") {
                    bike.capacitate = parseInt(bike.capacitate.replace("cc", "").replace("CM3", "").replace("cmc", "").replace("c.c.", "").replace("cm3", "").replace(",", "").trim())
                }

                if (bike.main_year === "undefined" || bike.main_year === "null" || bike.main_year === null || bike.main_year === undefined) {
                    bike.main_year = null
                } else {
                    bike.main_year = parseInt(bike.main_year)
                }

                if (bike.category === "undefined" || bike.category === "null" || bike.category === null || bike.category === undefined) {
                    bike.category = null
                }

                if (bike.capacitate === "undefined" || bike.capacitate === "null" || bike.capacitate === null || bike.capacitate === undefined) {
                    bike.capacitate = null
                }

                if (bike.capacitate === null) {
                    const cilinderArray = extractNumbersFromString(bike.bike_name)
                    for (const cilinderIndex in cilinderArray) {
                        const cilinder = cilinderArray[cilinderIndex]
                        if(cilinder >= 50){
                            bike.capacitate = cilinder
                        }
                    }
                }

                if (bike.capacitate !== null && (bike.permis.length === 0 || bike.permis.includes('{}'))) {
                    console.log(bike.permis)
                    const capacitate = parseInt(bike.capacitate)
                    if (capacitate >= 50 && capacitate <= 125) {
                        bike.permis = ['B']
                    }
                    if (capacitate > 125 && capacitate <= 500) {
                        bike.permis = ['A2', 'A']
                    }
                    if (capacitate > 500 && capacitate <= 800) {
                        bike.permis = ['A2']
                    }
                }


                if (bike.price === "undefined" || bike.price === "null" || bike.price === null || bike.price === undefined) {
                    bike.price = null
                }

                if (bike.price !== null && bike.price !== undefined && bike.price !== "null" && bike.price !== "undefined" && bike.price.includes("{")) {
                    bike.price = parseInt(bike.price.replace(/[{}]/g, "").replace(/\"/g, "").split(",")[0].replace(/[.,\s]+/g, ""))
                } else if (bike.price !== null && bike.price !== undefined && bike.price !== "null" && bike.price !== "undefined") {
                    bike.price = parseInt(bike.price.replace(/[.,\s]+/g, ""))
                }

                if (bike.old_price !== null && bike.old_price !== undefined && bike.old_price !== "null" && bike.old_price !== "undefined") {
                    bike.old_price = parseInt(bike.old_price.replace(/[.,\s]+/g, ""))
                }

                if (bike.old_price === null || bike.old_price === undefined || bike.old_price === "null" || bike.old_price === "undefined") {
                    bike.old_price = null
                }

                if (bike.price === null && bike.old_price !== null) {
                    bike.price = bike.old_price
                }

                if (bike.price === bike.old_price) {
                    bike.old_price = null
                }
            }
        }

        await scrapeForex()

        const currency_data = forexData.value

        res.json({ bikes: bikes, forex: currency_data })
    } catch (error) {
        console.log(error)
    }
})

app.post('/api/registerRequest', (req, res) => {
    const recaptchaResponse = req.body.captcha

    recaptcha.verify({ response: recaptchaResponse, remoteIp: req.socket.remoteAddress }, async (error, data) => {
        if (!error) {
            if (data.success === true) {
                const query = insertRequest(req)
                await process.postgresql.query(query)
                res.json({ message: "Request registered" })
            }
        } else {
            res.status(400).json({ message: "Something went wrong" })
        }
    })
})

const insertRequest = (req) => {
    const query = {
        text: `INSERT INTO public.service_requests (id, client_first_name, client_last_name, client_email, client_address, client_phone, client_work_location, vehicle_type, brand, category, main_year, capacitate, serial_number, other_operations, service_options) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`,
        values: []
    }

    const id = uuidv4()
    query.values.push(id)

    const clientInfo = req.body.data

    for (const infoIndex in clientInfo) {
        const info = clientInfo[infoIndex]
        query.values.push(info)
    }

    const serviceInfo = req.body.serviceOptions
    query.values.push(serviceInfo)

    return query
}

const forexJob = new cron.CronJob(
    '00 22 * * *', // Everyday at 10:00 pm
    function () {
        forexData.setValue(0.0)
    }
)
forexJob.start()
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})
