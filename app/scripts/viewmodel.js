/* eslint-disable no-unused-vars,no-undef,require-jsdoc */
// The following variables are exclusively used in map.js
var map;
var bounds;
var markers = [];

var locations = [
    {wikiTitle: 'Taj_Mahal',
        title: 'Taj Mahal',
            location: {lat: 27.175015, lng: 78.042155}},
    {wikiTitle: 'uluru',
        title: 'Uluru',
            location: {lat: -25.363, lng: 131.044}},
    {wikiTitle: 'Christ_the_Redeemer_(statue)',
        title: 'The Christ the Redeemer statue',
            location: {lat: -22.951944, lng: -43.210556}}
];

// The following variables are used in ajax calls. in the main VM.
var formattedImages;
var formattedLinks;
var formattedContent;

// This is the main viewmodel,
// it fetches a wiki-page asynchronously.
// It also makes sure the links are actual links.
function wikiViewModel() {
  var self = this;
    // wikiURL is used to make a dynamic string.
    // The string is is a parameter from populateInfoWindow(),
    // The url is the current markers title, the function is located in map.js.
  self.wikiURL = ko.observable();
    // contentString is the formatted data,
    // it has gone thorough the 'formatted' variables.
  self.contentString = ko.observable();

    // Make a GET request to Wikipedia.
    // url is the current markers title.
  self.wikiAjax = function(url, infowindow) {
        // Generate the url based on the markers title.
    wikiURL('https://en.wikipedia.org/w/api.php?action=parse&prop=info%7Ctext&page=' + url + '&utf8=&format=json&formatversion=2');
    $.ajax({
      url: wikiURL(),
      dataType: 'jsonp',
      type: 'GET',
      headers: {'Api-User-Agent': 'allmynameswastaken@gmail.com'},
      crossDomain: true,
            // data is a jsonp object with a predictable array, starting with parse.
      success: function(data) {
                // The root of the object.
        var rootQuery = data.parse;

                // Define the title of the wiki-page.
        var infoTitle = rootQuery.title;

                // Go through the text of the wiki-page and replace all links.
        formattedImages = rootQuery.text.replace(/\/\//g, 'https://');

                // Go through the text of the wiki-page and replace all image references.

        formattedLinks = formattedImages.replace(/href="/g, 'href="https://en.wikipedia.org');
                // Take the formatted strings and display the wiki-page's title and the text.

        formattedContent = '<h1>This is ' +
            infoTitle +
            '</h1>' +
            formattedLinks;
                // Assign the formatted strings to contentString()
        contentString(formattedContent);
        infowindow.setContent(contentString());
      }
    });
  };
}
