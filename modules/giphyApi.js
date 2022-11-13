require('dotenv/config');  
const https = require('https');
const apiKey = process.env.API_KEY
let urlArr = [];
let data= '';

const getGif = (arg, cb) => {
// assembles a valid url 
	const url = (searchTerm) => {
		if(!searchTerm){
			searchTerm = 'random'
			return `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&rating=pg-13&api_key=${apiKey}`
		}else{
			return `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&rating=pg-13&api_key=${apiKey}`
		}
	};

let endPoint = url(arg);

//return urls for looping and still gifs only.
	const filterUrls = (obj) => {
		let json = JSON.parse(obj);
		for (let i = 0; i < json.data.length; i++) {
			let a = {
				still: json.data[i].images.original_still,
				looping: json.data[i].images.original_still
			};
			urlArr.push(a);
		};
		return urlArr;  
	};
//makes get request to api and returns filtered data.
	const request = https.get(endPoint, (res) => {
		if (res.statusCode !== 200) {
			console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
			res.resume();
			return;
		}else { console.log('success') }
		res.on('data', (chunk) => {
			data += chunk
		});
		res.on('close', () => {
			
			cb(filterUrls(data));
		});
	});


	
};

module.exports = getGif;                                                            

