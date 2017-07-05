var title = ko.observable();
var categories = ko.observableArray();
var categoryname;
var category = ko.observable();
var vm = new OverviewModel();
function OverviewModel() {

    $.getJSON("http://localhost:5050/api/v1/JSON", function (data) {
        console.log("Got your data! " + data.A_title);

        var self = this;
        var category_data = data.categories;
        title(data.A_title);
        categoryname = category_data;
        category = '<h3>' + categoryname[0].name + '</h3><p>' + categoryname[0].description + '</p>';
        console.log(data);
        this.google = ko.observable(!!window.google); // true
        initMap();

    });
}

function initMap() {
    ko.applyBindings(vm);
    console.log(this.category);
    var home = {lat: 56.816599, lng: 8.383835};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: home
    });
    var infowindow = new google.maps.InfoWindow({
        content: this.category
    });

    var marker = new google.maps.Marker({
        position: home,
        map: map,
        title: 'My home!'
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

}
