const express = require("express");
const app = express();
var fs = require("fs");
var photoGet = require("./controllers/photoGet.js");
var urlTransform = require("./controllers/urlTransform.js");
const mongoose = require("mongoose");
const HistoryEntry = require("./models/history.js");
//var exampleObj = {"photos":{"page":1,"pages":15975,"perpage":10,"total":"159748","photo":[{"id":"39047876475","owner":"138991380@N06","secret":"8c7817cfd9","server":"4673","farm":5,"title":"Eclipse considers making a Rust IDE","ispublic":1,"isfriend":0,"isfamily":0},{"id":"39235704774","owner":"139769506@N02","secret":"3ab4fb4f8e","server":"4604","farm":5,"title":"can you make money with iphone apps","ispublic":1,"isfriend":0,"isfamily":0},{"id":"28166465509","owner":"139769506@N02","secret":"a432a96bdb","server":"4754","farm":5,"title":"work from home fifth harmony lyrics spanish","ispublic":1,"isfriend":0,"isfamily":0},{"id":"39913980592","owner":"69032720@N00","secret":"3bebf30079","server":"4740","farm":5,"title":"Customer Browsing Tai Po Market","ispublic":1,"isfriend":0,"isfamily":0},{"id":"26073597268","owner":"69032720@N00","secret":"868f9844a9","server":"4758","farm":5,"title":"Woman Pushing Trolley in Central","ispublic":1,"isfriend":0,"isfamily":0},{"id":"39913979132","owner":"69032720@N00","secret":"39eaf7d977","server":"4657","farm":5,"title":"Old Woman in Sai Ying Pun","ispublic":1,"isfriend":0,"isfamily":0},{"id":"39913979592","owner":"69032720@N00","secret":"8bbc47aa12","server":"4756","farm":5,"title":"Hawkers in Sham Shui Po","ispublic":1,"isfriend":0,"isfamily":0},{"id":"26073596988","owner":"69032720@N00","secret":"bd67942f42","server":"4709","farm":5,"title":"Butcher in Sai Ying Pun Market","ispublic":1,"isfriend":0,"isfamily":0},{"id":"26073565088","owner":"146611591@N04","secret":"356b2bba59","server":"4701","farm":5,"title":"Mojácar Attracts New Markets At Fitur Tourism Fair","ispublic":1,"isfriend":0,"isfamily":0},{"id":"39913878702","owner":"137943672@N03","secret":"5d646464d1","server":"4718","farm":5,"title":"Boqueria market.","ispublic":1,"isfriend":0,"isfamily":0}]},"stat":"ok"}
//console.log(exampleObj.photos.photo[0].title); //test obj returned from flick API


app.get('', function(req, res){
 res.writeHead(200, {"Content-Type":"text/html"});
 var index = fs.createReadStream('public/index.html', 'utf8');
  index.pipe(res);  
});
     
     
app.get('/search', function(req, res){
	console.log(req.query.text);
	var text = req.query.text;
	var per_page = req.query.per_page
	var page = req.query.page;
	saveHistory(text);
	res.writeHead(200, {"Content-Type" : "text/json"});	
	photoGet(text, per_page, page).then(function(data){
		urlTransform(data).then( function(urls){
			res.end(JSON.stringify(urls));
		})
		
	})
});

app.get('/history', function(req, res){
	HistoryEntry.find({}).then(function(result){
		result = result.slice(0, req.query.number);
		res.end(JSON.stringify(result));
	});
});


function saveHistory(term){
	var entry = new HistoryEntry({
		text: term,
		time: Date.now()
	});

	entry.save();
}

//setup static files
app.use('/assets', express.static('assets'));

//connect to MongoDB, no tests involved
mongoose.connect("mongodb://localhost/imagesearch");
mongoose.connection.once('open', function(){
	console.log("Connection has been made, now make fireworks...");
}).on('error', function(err){
	console.log('Connection error:' + err);
});


//connect to environment port or local port
app.listen(process.env.port || 3000);
console.log("Now listening to requests");