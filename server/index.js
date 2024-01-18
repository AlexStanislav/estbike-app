const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const port = process.env.PORT || 3000;
// const connection = require('./api/connection');
// connection();

app.use(express.json())
app.use(cors())
app.use(express.static('public'));

app.get('/api/bikes', async (req, res) => {
    // const tables = ["beneli_bikes", "kawasaki_atv", "kawasaki_bikes", "yamaha_bikes", "yamaha_atv", "yamaha_scooters", "suzuki_bikes"];
    // const allBikes = {}
    // for (const table of tables) {
    //     const result = await process.postgresql.query(`SELECT * FROM ${table}`)
    //     allBikes[table] = result
    // }
    const allBikes = JSON.parse(fs.readFileSync('./api/allBikes.json', 'utf8'))
    res.json(allBikes)
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})
