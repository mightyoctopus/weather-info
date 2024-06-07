require ('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8080;
const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;

// Configure CORS options:

const corsOptions = {
    origin: 'https://mhhong.dev',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: '*',
};

app.use(cors(corsOptions));
const basePath = '/weather-info';
app.use(basePath, express.static(path.join(__dirname, '../frontend')));


app.get(`${basePath}/weather`, async (req, res) => {
    const city = req.query.city;
    console.log("Recieved request for city:", city);
    try {
        const response = await axios.get(`${apiUrl}${city}&appid=${apiKey}`);
        console.log(`Weather data fetched for city: ${city}`, response.data);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch the weather data."})
    }
});

// Handle other routes, return the index.html file -- woldcard route below than the main route.
app.get(`${basePath}/*`, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
 });


app.listen(port, () => {
    console.log("Server is running on port:", port);
});