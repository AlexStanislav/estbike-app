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
const fs = require('fs');
connection();

app.use(express.urlencoded({ extended: true }));
app.use(history())
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

function extractNumbersFromString(str) {
    if (str.match(/\d+/g) !== null) return str.match(/\d+/g).map(Number);
}

function stringToJson(inputString) {
    // Remove the starting and ending quotes
    let string = inputString.substring(1, inputString.length - 1);
    
    // Remove the square brackets
    string = string.substring(1, string.length - 1);
    
    // Split the string into individual elements
    let elements = string.split("','");
    
    // Remove the single quotes from each element
    let jsonElements = elements.map(element => element.replace("'", ""));
    
    // Convert the elements into a JSON array
    let jsonArray = JSON.stringify(jsonElements);
    
    return jsonArray;
}

app.get('/api/bikes', async (req, res) => {
    try {
        const tables = await process.postgresql.query(`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`);
        const bikes = {}
        for (const table of tables) {
            if (table.tablename.includes('_bikes') || table.tablename.includes('_scooters') || table.tablename.includes('_atv') || table.tablename.includes('_snowmobiles') || table.tablename.includes('_ssv')) {
                const query = `SELECT * FROM ${table.tablename}`;
                const result = await process.postgresql.query(query);
                bikes[table.tablename] = result
            }
        }

        for (const bikeTypeIndex in bikes) {
            let bikeTypes = bikes[bikeTypeIndex]
            // if (bikeTypeIndex === 'swm_bikes') {
            //     const bikesArr = bikeTypes
            //     const bikes = () => {
            //         const colorBikes = {};
            //         for (const key in bikesArr) {
            //             const bike = bikesArr[key];
            //             const bikeNameArr = bike.bike_name.split("-");
            //             if (bikeNameArr.length >= 3) {
            //                 let colorArr = bikeNameArr.slice(2, bikeNameArr.length);
            //                 let color = colorArr.join(" ").replace(/\d+\s/g, "");
            //                 if (colorArr.length === 3) {
            //                     colorArr.shift();
            //                     color = colorArr.join(" ");
            //                 }
            //                 if (color.length === 1) {
            //                     color = null;
            //                 }

            //                 if (color !== null && color !== "bike") {
            //                     colorBikes[bike.bike_name] = bike;
            //                 }
            //             }
            //         }

            //         const addColors = (obj) => {
            //             const colors = {};
            //             for (const key in obj) {
            //                 const bikeNameArr = key.split("-");
            //                 let bikeName = "";
            //                 let colorArr = bikeNameArr.slice(2, bikeNameArr.length);
            //                 let color = colorArr.join(" ").replace(/\d+\s/g, "");

            //                 if (bikeNameArr.length >= 3) {
            //                     bikeName = bikeNameArr.slice(0, 2).join("-");
            //                 } else {
            //                     bikeName = bikeNameArr.slice(0, 3).join("-");
            //                 }

            //                 if (colorArr.length === 3) {
            //                     colorArr.shift();
            //                     color = colorArr.join(" ");
            //                 }
            //                 if (color.length === 1) {
            //                     color = null;
            //                 }

            //                 if (!colors[bikeName]) {
            //                     colors[bikeName] = [];
            //                 }
            //                 if (!colors[bikeName].includes(color)) {
            //                     colors[bikeName].push(color);
            //                 }
            //             }
            //             for (const key in obj) {
            //                 const bikeNameArr = key.split("-");
            //                 let bikeName;
            //                 if (bikeNameArr.length >= 3) {
            //                     bikeName = bikeNameArr.slice(0, 2).join("-");
            //                 } else {
            //                     bikeName = bikeNameArr.slice(0, 3).join("-");
            //                 }
            //                 obj[key].colors = colors[bikeName];
            //             }
            //         };

            //         addColors(colorBikes);

            //         return bikesArr;
            //     };
            //     bikeTypes = bikes()
            // }

            for (const bikeIndex in bikeTypes) {
                const bike = bikeTypes[bikeIndex]

                if(bike.bike_slogan === null || bike.bike_slogan === "undefined") {
                    bike.bike_slogan = ''
                }

                if (bike.vehicle_type === 'atv' || bike.vehicle_type === 'ssv') {
                    if (bike.brand === 'polaris') {
                        if (bike.bike_name.includes('t3b') || bike.bike_name.includes('l7e') || bike.bike_name.includes('t1b')) {
                            const omologare = bike.bike_name.split("-")
                            bike.omologare = omologare.filter(item => item === 't3b' || item === 'l7e' || item === 't1b')[0]
                        }
                    }

                    if(bike.omologare !== null && bike.omologare.includes('"')){
                        bike.omologare = bike.omologare.replace(/"/g, "'")
                    }

                    if (bike.omologare === 't1b') {
                        bike.omologare = 't3b'
                    }

                    if (bike.omologare === null || bike.omologare === "undefined") {
                        bike.omologare = 'neinmatriculabil'
                    }

                    if (bike.omologare !== 'neinmatriculabil') {
                        bike.omologare = bike.omologare.replace(/\{/g, "[").replace(/\}/g, "]");

                        bike.omologare = stringToJson(bike.omologare)
                        if (!bike.omologare.toLowerCase().includes("null")) {
                            bike.omologare = JSON.parse(bike.omologare)
                        } else {
                            bike.omologare = 'neinmatriculabil'
                        }
                    }

                } else {
                    bike.omologare = null
                }

                if (bike.bike_name.includes('\(') && bike.bike_name.includes('\)')) {
                    bike.bike_name = bike.bike_name.replace(/-\(.+\)/g, '').replace(/\d+(\/\d+)+/g, bike.capacitate)
                }

                if (bike.bike_name.includes(bike.main_year)) {
                    bike.bike_name = bike.bike_name.replace(bike.main_year, '')
                }

                if (bike.brand === 'utv') {
                    bike.brand = 'linhai'
                    bike.vehicle_type = 'ssv'
                }

                if (bike.bike_name.includes("utv")) {
                    bike.vehicle_type = "ssv"
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

                if (bike.category !== null && bike.category.includes('/')) {
                    bike.brand = bike.category.replace('/', '')
                    bike.category = null
                }

                if (bike.capacitate === "undefined" || bike.capacitate === "null" || bike.capacitate === null || bike.capacitate === undefined) {
                    bike.capacitate = null
                }

                if (bike.capacitate === null) {
                    const cilinderArray = extractNumbersFromString(bike.bike_name)
                    for (const cilinderIndex in cilinderArray) {
                        const cilinder = cilinderArray[cilinderIndex]
                        if (cilinder >= 50) {
                            bike.capacitate = cilinder
                        }
                    }
                }



                if (bike.capacitate !== null && (bike.permis.length === 0 || bike.permis.includes('{}'))) {
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

                if (bike.vehicle_type === "atv" || bike.vehicle_type === "ssv") {
                    bike.permis = ['B']
                }

                if(bike.category !== null){
                    if(bike.category.toLowerCase().includes("children")){
                        bike.permis = []
                    }
                }

                if (bike.price === "null" || bike.price === "" || bike.price === "undefined" || bike.price === null || bike.price === undefined) {
                    bike.price = null
                }

                if (bike.old_price === "null" || bike.old_price === "" || bike.old_price === "undefined" || bike.old_price === null || bike.old_price === undefined) {
                    bike.old_price = null
                }

                if (bike.price !== null && !bike.price.includes("{")) {
                    bike.price = bike.price.replace(/\D/g, '')
                }


                if (bike.old_price !== null && !bike.old_price.includes("{")) {
                    bike.old_price = bike.old_price.replace(/\D/g, '')
                }

                if (bike.price !== null && bike.price.includes("{")) {
                    bike.price = bike.price.replace(/\{/g, "[").replace(/\}/g, "]").replace(/\'/g, '"');
                    if (bike.price.toLowerCase().includes("null")) {
                        bike.price = null
                    }
                    bike.price = JSON.parse(bike.price)
                }

                if (bike.old_price !== null && bike.old_price.includes("{")) {
                    bike.old_price = bike.old_price.replace(/\{/g, "[").replace(/\}/g, "]").replace(/\'/g, '"');;
                    if (bike.old_price.toLowerCase().includes("null")) {
                        bike.old_price = null
                    }
                    bike.old_price = JSON.parse(bike.old_price)
                }

                if ((bike.price !== null && !bike.price.includes("{")) && (bike.old_price !== null && !bike.old_price.includes("{"))) {
                    if (bike.price === bike.old_price) {
                        bike.old_price = null
                    }
                }

                if (Array.isArray(bike.price) && bike.price.length === 0) {
                    bike.price = null
                }

                if (Array.isArray(bike.old_price) && bike.old_price.length === 0) {
                    bike.old_price = null
                } 

                if(Array.isArray(bike.old_price) && bike.old_price[0] === ''){
                    bike.old_price[0] = null
                }

                if (bike.colors === "undefined" || bike.colors === "null" || bike.colors === null || bike.colors === undefined) {
                    bike.colors = null
                }

                if (bike.colors !== null) {
                    bike.colors = JSON.parse(bike.colors.replace("{", "[").replace("}", ']'))
                }

                if (bike.colors_display === "undefined" || bike.colors_display === "null" || bike.colors_display === null || bike.colors_display === undefined) {
                    bike.colors_display = null
                }

                if (bike.colors_display !== null) {
                    bike.colors_display = bike.colors_display.replace('"{', '{').replace('}"', '}').replace(/\\"/g, '"')
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
