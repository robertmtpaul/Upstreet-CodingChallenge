const axios = require('axios');
const express = require('express');
const app = express();
const PORT = 8080;

// define first route for the home page
app.get("/", (request, response) => {
    response.send("Testing the first route");
})

// start express server
app.listen(PORT, () => {
    console.log(`Now serving on at http://localhost:${PORT}...`);
});