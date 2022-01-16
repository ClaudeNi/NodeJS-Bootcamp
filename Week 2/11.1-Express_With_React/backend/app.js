const config = require("./config");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.get("/weather/:address", async (req, res) => {
    if (!req.params.address) {
        return res.send({
            error: "You must provide an address!",
        });
    }

    const data = await axios.get(
        `http://api.weatherstack.com/current?access_key=${config.apiKey}&query=${req.params.address}`
    );
    const response =
        data.data.current.weather_descriptions[0] +
        ". It is currently " +
        data.data.current.temperature +
        " degress out.";
    res.send(response);
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});
