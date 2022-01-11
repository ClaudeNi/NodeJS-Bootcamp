const axios = require("axios");
const request = require("request");

const pokemon = 25;

// fetching using axios
axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((data) => {
    console.log(`\nThis Data was fetched using axios`);
    console.log(`Name: ${data.data.name}\n`);
});

// fetching using request
request(
    { url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`, json: true },
    (error, response) => {
        console.log(`This Data was fetched using request`);
        console.log(`Name: ${response.body.name}\n`);
    }
);
