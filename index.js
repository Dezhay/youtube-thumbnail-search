const YOUTUBE_SEARCH_URL =
'https://www.googleapis.com/youtube/v3/search';

function getApiData(searchTerm, callback) {
	const settings = {
		url: YOUTUBE_SEARCH_URL,
		data: {
			q: `${searchTerm}`, //check param documentation
			part: `snippet`,
			key: `AIzaSyDRN8SRnzCVqZ2NQDYMsIMul_rMBPODfGg`,
		},		
		dataType: 'JSON',
		type: 'GET',
		success: callback
	};
		$.ajax(settings);
		console.log('getApiData ran');

	//console.log(settings.data);

	/*jsonVar = $.ajax();
	document.write(jsonVar);*/
}




function renderResults(result) {
	/*let resultsFromApi = `
	<div>
      <h2>
      <p>Okay, Here's what we got: 
      	<span class="js-search-data">${result.title}</span>
      </p>      
    </div>
	`;
	$('.js-search-results').html(resultsFromApi);*/


	return `
	<div>
      	<h2>
      		<p> 
      		<a  target="_blank" href="https://www.youtube.com/watch?v=${result.id.videoId}">
      		<span class="js-search-data">${result.snippet.title}</span>
      		<img src="${result.snippet.thumbnails.default.url}">
      		</p> 
      		</a>
      	</h2>     
    </div>
    `;
	console.log('renderResults ran');
	//console.log(result);
}

function displayYoutubeSearchData(data) {
	const results = data.items.map((item, index) => //THE PROBLEM!!!!
	renderResults(item)
	);
	
	$('.js-search-results').html(results)

	console.log(data);
} 

function listenForSubmit() {
	$('.js-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		const query = queryTarget.val();
		queryTarget.val("");
		getApiData(query, displayYoutubeSearchData);
	});
}


$(listenForSubmit);




