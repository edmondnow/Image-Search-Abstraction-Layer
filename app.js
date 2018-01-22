const express = require("express");
const app = express();
var photoGet = require("./controllers/photoGet.js");


var obj = photoGet('cow', 10, 1);

app.get("/", function(req, res){
	res.writeHead(200, {"Content-Type" : "text/json"});
	res.end("lol");
});

app.listen(process.env.port || 3000);
console.log("Now listening to requests");