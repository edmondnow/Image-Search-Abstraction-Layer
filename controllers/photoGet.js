const https = require('https');
const key = "309a8677c0e619af8c789ec7f71dfcde";
const secret = "d602f310f3368642";



var photoGet = function(text, per_page, page){


  https.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + key + '&text=' + text + '&per_page=' + per_page + '&page=' + page + '&format=json&nojsoncallback=1',
  (resp) => {1
    let data = '';
   
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
   
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data));
      return JSON.parse(data);
    });
   
  }).on("error", (err) => {
    console.log("Error: " + err.message);
    return err.message;
  });

}
module.exports = photoGet;