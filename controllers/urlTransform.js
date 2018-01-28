/*
This NodeJS module maps photo elements to URL to retrieve pictures. See documentation:
https://www.flickr.com/services/api/misc.urls.html
*/

var urlTransform = function(data){
	return new Promise( function(resolve, reject){
		var urls = [];
		console.log(data.photos.photo.length);
		if(data.photos.photo.length != 0){
			for(var i = 0; i< data.photos.photo.length; i++){
				console.log(data.photos.photo[i]);
				var photo = {};
				var url = '';
				url += 'https://farm' + data.photos.photo[i].farm + '.staticflickr.com/' + data.photos.photo[i].server + '/' + data.photos.photo[i].id + '_' + data.photos.photo[i].secret + '.jpg';
				photo.url = url;
				photo.title = data.photos.photo[i].title;
				urls.push(photo);
			}
			resolve(urls);
		} else {
			reject('No results, try different text, per_page and/or page!')
		}
	})
}


module.exports = urlTransform;

