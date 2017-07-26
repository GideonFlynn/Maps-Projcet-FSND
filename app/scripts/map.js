/* eslint-disable no-unused-vars,no-undef, require-jsdoc, no-alert */
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: 'satellite',
    styles: styles,
    mapTypeControl: true
  });
  bounds = new google.maps.LatLngBounds();
  // Place markers on the map.
  for (var i = 0; i < locations.length; i++) {
    // Get position and wikiTitle from the locations array.
    position = locations[i].location;
    title = locations[i].title;
    wikiTitle = locations[i].wikiTitle;
    // Create a marker per location
    marker = new google.maps.Marker({
      position: position,
      title: title,
      wikiTitle: wikiTitle,
      animation: google.maps.Animation.DROP,
      visible: true
    });

    // Add current marker to the locations array.
    locations[i].marker = marker;
    // Make them observable by KnockOutJS
    MVM.locationsList()[i].marker = marker;
    // Add current marker to the marker array
    markers.push(marker);
    // Create an onclick event to open the infowindow at each marker.
    marker.addListener('click', openInfoWindow);
    // Two event listeners - one for mouseover, one for mouseout, to have them
    // bounce or drop.
    marker.addListener('mouseover', toggleBounce);
    marker.addListener('mouseout', toggleOff);
  }
  function openInfoWindow() {
    'use strict';
    this.setAnimation(google.maps.Animation.DROP);
    MVM.populateInfoWindow(this, largeInfowindow);
  }

  // Create the infowindow.
  largeInfowindow = new google.maps.InfoWindow({});
  // Fit bounds if there has been a resize.
  google.maps.event.addDomListener(window, 'resize', function() {
    // `bounds` is a `LatLngBounds` object
    zoomOut();
  });

  map.fitBounds(bounds);
  showMarkers();
}
// If the maps API doesn't load properly
mapError = function() {
  // Error handling
  alert('Google Maps API did not load correctly. Please try to refresh and' +
    ' make sure the URL is correct.');
  console.log('Google Maps API did not load correctly.' +
              ' Please try to refresh and make sure the URL is correct.');
};

MVM = new MVM();
ko.applyBindings(MVM);

