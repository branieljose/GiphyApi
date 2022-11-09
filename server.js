require('dotenv/config');  
const express = require("express");
const PORT = process.env.PORT || 3000;
const getGif = require('./modules/giphyApi.js');


const app = express();
app.use( express.json() );
// req --> incoming data, res --> outgoing data

app.get('/', (req, res) => {
    let data = getGif('', (chunk) => {
        res.send(chunk);
    });
});

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
});