/*
This NodeJS module maps photo elements to URL to retrieve pictures. See documentation:
https://www.flickr.com/services/api/misc.urls.html
*/

var urlTransform = function(data, farm_id, server_id, id, secret){
	var urls = [];
	var url = '';
	return new Promise( function(resolve, reject){
		if(data.photo.length != 0){
			for(var i = 0; i< data.photo.length; i++){
				console.log(data.photo[i]);
				url += 'https://farm' + farm_id + '.staticflickr.com/' + server_id + '/' + id + '_' + secret + '.jpg';
				urls[i].push([url, data.photo[0].title]);
			}
			resolve({urls});
		} else {
			reject('No results, try different text, per_page and/or page!')
		}
	})
}


module.exports = urlTransform;

