/* eslint-disable no-unused-vars,no-undef,no-unused-expressions,no-loop-func,require-jsdoc,no-negated-condition */
function initMap() {
  var styles = [
    {
      featureType: 'administrative',
      stylers: [
        {
          visibility: 'on'
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'simplified'
        }
      ]
    },
    {
      featureType: 'landscape',
      stylers: [
        {
          color: '#adadad'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#6c6c6c'
        },
        {
          visibility: 'on'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#414141'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff'
        }
      ]
    },
    {
      featureType: 'road',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'water',
      stylers: [
        {
          color: '#2186d8'
        }
      ]
    }
  ];
  map = new google.maps.Map(document.getElementById('map'), {
    styles: styles,
    mapTypeId: 'terrain',
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
      animation: google.maps.Animation.DROP
    });

    // Add current marker to the locations array.
    locations[i].marker = marker;
    // Make them observable by KnockOutJS
    MVM.locationsList()[i].marker = marker;
    // Add current marker to the marker arrar
    markers.push(marker);
    // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
      map.panBy(0, 0);
    });
    // Two event listeners - one for mouseover, one for mouseout, to have them bounce or drop.
    marker.addListener('mouseover', toggleBounce);
    marker.addListener('mouseout', toggleOff);
  }

  // Create the infowindow.
  largeInfowindow = new google.maps.InfoWindow({
  });

  function populateInfoWindow(marker, infowindow) {
      // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
    // Clear the infowindow content to give the API time to load.
      infowindow.setContent('');
      infowindow.marker = marker;
    // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
        marker.setAnimation(null);
    // Move the map back to its boundaries,
    // bounds are defined in showMarkers(), located at the bottom of this file.
        map.fitBounds(bounds);
        map.panBy(-140, 0);
      });
        // Request data asynchronously.
        // Arg one is the search term (en.wikipedia.com/wiki/<MY_SEARCH> ).
        // Arg two is the current infowindow.
      wikiAjax(marker.wikiTitle, infowindow);

        // Pan map to display the whole infowindow.
      map.setZoom(15);
      map.panTo(marker.position);
      map.panBy(0, -450);
      map.setTilt(75);
        // Open the infowindow on the current marker.
      infowindow.open(map, marker);
    }
  }

// Display all markers on the map.
  function showMarkers() {
    // Iterate over the markers array
    for (var i = 0; i < markers.length; i++) {
      // Set marker on the map.
      markers[i].setMap(map);
      // Extend boundaries to current marker.
      bounds.extend(markers[i].position);
    }
    // Configure map to match new boundaries.
    map.fitBounds(bounds);
  }
  showMarkers();
}
