var marker;
var map;
function myFunctionModel() {
    var self = this;
    self.current_posistion = ko.observable(taj_mahal);
    self.wiki_title = ko.observable("Taj Mahal");
    $.ajax( {
        url: "https://en.wikipedia.org/w/api.php?action=parse&prop=info%7Ctext&page=Taj_Mahal&utf8=&format=json&formatversion=2&mobileformat=1",
        dataType: 'jsonp',
        type: 'GET',
        headers: { 'Api-User-Agent': 'allmynameswastaken@gmail.com' },
        crossDomain: true,
        success: function(data) {
            var formatted_text;
            var root_query = data.parse;

            var info_title = root_query.title;
            formatted_text = root_query.text.replace(/\/\//g, "https://");
            var info_content = "<h1>This is " + info_title + "</h1>" + formatted_text ;

            self.contentString = ko.observable(info_content);
        }
    });

}
