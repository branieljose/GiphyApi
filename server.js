require('dotenv/config');  
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const getGif = require('./modules/giphyApi.js');


const app = express();
app.use( express.json() );
app.use(express.static("./public"));
// app.use(express.static(path.join(__dirname, "js")))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/search', (req, res) => {
    let term = req.query.q
    console.log(term);
    getGif(term, (chunk) => {
        res.send(chunk);
    });
});

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
});