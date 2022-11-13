require('dotenv/config');  
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const getGif = require('./modules/giphyApi.js');


const app = express();
app.use( express.json() );
app.use(express.static(process.cwd() + "./public"));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.get('/search', (req, res) => {
    console.log(req.body);
    // let data = getGif('', (chunk) => {
    //     res.send(chunk);
    // });
});

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
});