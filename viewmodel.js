var map;
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

function myFunctionModel() {
    var self = this;

    self.wiki_URL = ko.observable();
    self.contentString = ko.observable();

    self.ajaxcall = function (url, infowindow) {
        console.log(url);

        wiki_URL("https://en.wikipedia.org/w/api.php?action=parse&prop=info%7Ctext&page=" + url + "&utf8=&format=json&formatversion=2&mobileformat=1");

        $.ajax({
            url: wiki_URL(),
            dataType: 'jsonp',
            type: 'GET',
            headers: {'Api-User-Agent': 'allmynameswastaken@gmail.com'},
            crossDomain: true,
            success: function (data) {
                var formatted_images;
                var formatted_links;

                var root_query = data.parse;
                var info_title = root_query.title;

                formatted_images = root_query.text.replace(/\/\//g, "https://");
                formatted_links = formatted_images.replace(/href="/g, 'href="https://en.wikipedia.org');

                var info_content = "<h1>This is " + info_title + "</h1>" + formatted_links;
                contentString(info_content);
                infowindow.setContent(contentString());
            }
        });
    };
}
