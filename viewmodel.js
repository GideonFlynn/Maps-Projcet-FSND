function myFunctionModel() {
    var self = this;
    self.current_posistion = ko.observable(taj_mahal);
    self.wiki_title = ko.observable("Taj Mahal");
    $.ajax( {
        url: "https://en.wikipedia.org/w/api.php?action=parse&page=Taj_Mahal&utf8=&format=json&formatversion=2&mobileformat=1&noimages=1",
        dataType: 'json',
        type: 'GET',
        headers: { 'Api-User-Agent': 'allmynameswastaken@gmail.com' },
        crossDomain: true,
        success: function(data) {
        
            var root_query = data.parse;

            self.contentString = ko.observable(root_query.text);
        }
    });
}
