var taj_mahal = {lat: 27.175015, lng: 78.042155};
var uluru = {lat: -25.363, lng: 131.044};

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: current_posistion()
    });

    var infowindow = new google.maps.InfoWindow({

    });



    var marker = new google.maps.Marker({
        position: current_posistion(),
        map: map,
        title: wiki_title()
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
        infowindow.setContent(contentString());
    });
}