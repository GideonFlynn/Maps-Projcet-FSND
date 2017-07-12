function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: locations[0].location
    });

    var largeInfowindow = new google.maps.InfoWindow();

    // Place the markers on the map
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function () {
            populateInfoWindow(this, largeInfowindow);
        });
        // TODO: Two event listeners - one for mouseover, one for mouseout, to change the colors back and forth.
    }
    function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {
            // Clear the infowindow content to give the API time to load.
            infowindow.setContent('');
            infowindow.marker = marker;
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
            });
            // Request data asynchronously.
            // Parameter one is the search term(en.wikipedia.com/wiki/<SEARCH_TERM>).
            // Parameter two is the current infowindow.
            ajaxcall(marker.title, infowindow);
            // Open the infowindow on the correct marker.
            //TODO: Map (or viewport) repositions so the infowindow is completely visible.
            console.log(marker.position);
            map.panTo(marker.position);
            infowindow.open(map, marker);

        }
    }

    // Make sure every marker can be seen on load
    function showMarkers() {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
    }

    showMarkers();
}
