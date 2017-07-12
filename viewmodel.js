// The following variables are exclusively used in map.js
var map, bounds;
var markers = [];

var locations = [
    {
        title: 'Taj_Mahal',
        location: {lat: 27.175015, lng: 78.042155}
    },
    {
        title: 'uluru',
        location: {lat: -25.363, lng: 131.044}
    },
    {
        title: 'Christ_the_Redeemer_(statue)',
        location: {lat: -22.951944, lng: -43.210556}
    }
];

// The following variables are used in ajax calls. in the main VM.
var formatted_images;
var formatted_links;
var formatted_content;

// This is the main viewmodel(VM),
// wikiViewModel() fetches a wiki-page asynchronously.
// It also makes sure the links are actual links.
function wikiViewModel() {
    var self = this;
    // wiki_URL is used to make a dynamic string.
    // The string is is a parameter from populateInfoWindow(),
    // The url is the current markers title, the function is located in map.js.
    self.wiki_URL = ko.observable();
    // contentString is the formatted data,
    // it has gone thorough the formatted_* variables where * is anything.
    self.contentString = ko.observable();

    // Make a GET request to Wikipedia.
    // url is the current markers title.
    self.wiki_ajax = function (url, infowindow) {
        // Generate the url based on the markers title.
        wiki_URL("https://en.wikipedia.org/w/api.php?action=parse&prop=info%7Ctext&page=" + url + "&utf8=&format=json&formatversion=2&mobileformat=1");
        $.ajax({
            url: wiki_URL(),
            dataType: 'jsonp',
            type: 'GET',
            headers: {'Api-User-Agent': 'allmynameswastaken@gmail.com'},
            crossDomain: true,
            // data is a jsonp object with a predictable array, starting with parse.
            success: function (data) {
                // The root of the object.
                var root_query = data.parse;

                // Define the title of the wiki-page.
                var info_title = root_query.title;

                // Go through the text of the wiki-page and replace all links.
                formatted_images = root_query.text.replace(/\/\//g, "https://");

                // Go through the text of the wiki-page and replace all image references.

                formatted_links = formatted_images.replace(/href="/g, 'href="https://en.wikipedia.org');
                // Take the formatted strings and display the wiki-page's title and the text.

                formatted_content = "<h1>This is " + info_title + "</h1>" + formatted_links;
                // Assign the formatted strings to contentString()
                contentString(formatted_content);
                infowindow.setContent(contentString());
            }
        });
    };
}
