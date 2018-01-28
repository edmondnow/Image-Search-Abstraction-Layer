
1. Create an API that when given a  query/phrase/expression will return relevant images from around the web in an object form.


a. Metadata Required: URL, alt text, and page urls where the image is used [will not use latter];
b. I can pagine the responses by adding a ?offset=2 parameter. No offset, return the N most relevant images. Offset = 1 (IE page 2), return the next set of N most relevant images.
c. I can get a list of the most recently submitted search string. every time someone performs a search using your API you're going to need save the search query and the time it was searched. Your API can bring up a search history, which will pull the N most recent searches from your database They can access this by hitting another endpoint, say /history/


1. Things to do:

1.  Make a module where you can submit a text string, per_page number, and a page number that retreieves the solutions. [done]
2.  Make a module where that takes user submitted get request and submits it to the retrieve mode. [done]
3. Transform URL according to Flickr specifications. [done]
3.  Enable to save search queries to DB by search_id, search_time, text, results pp, page, and results. [done]
4. Make an endpoint where you can retrieve N number of searches [done];




