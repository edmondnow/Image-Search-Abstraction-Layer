const express = require("express");
const app = express();
var fs = require("fs");
var photoGet = require("./controllers/photoGet.js");
var urlTransform = require("./controllers/urlTransform.js");


app.get('/photosearch', function(req, res){
	console.log(req.query);
	var text = req.query.text;
	var per_page = req.query.per_page
	var page = req.query.page;
	var urls;
	res.writeHead(200, {"Content-Type" : "text/json"});	
	photoGet(text , per_page, page).then(function(data){
		urls = urlTransform(data);
		res.end(JSON.stringify(urls));
	})
});



//setup static files
app.use('/assets', express.static('assets'));


app.listen(process.env.port || 3000);
console.log("Now listening to requests");