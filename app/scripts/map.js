/* eslint-disable no-unused-vars,no-undef,no-unused-expressions,no-loop-func,require-jsdoc,no-negated-condition */
var mouseout;
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

  // Place some markers on the map.
  // locations are found in viewmodel.js.
  for (var i = 0; i < locations.length; i++) {
    // Get the position and wikiTitle from the location array.
    position = locations[i].location;
    title = locations[i].title;
    wikiTitle = locations[i].wikiTitle;
    // Create a marker per location, and put into markers array.
    marker = new google.maps.Marker({
      position: position,
      title: title,
      wikiTitle: wikiTitle,
      animation: google.maps.Animation.DROP
    });

    // Push the marker to our array of markers.
    locations[i].marker = marker;
    MVM.locationsList()[i].marker = marker;
    /*
     clickListener = function() {
     marker.addListener('listClick', function() {
     'use strict';
     populateInfoWindow(this, largeInfowindow);
     });
     };
     */
    markers.push(marker);
    // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function() {
      toggleBounce;
      populateInfoWindow(this, largeInfowindow);

    });
    // Two event listeners - one for mouseover, one for mouseout, to change the colors back and forth.
    marker.addListener('mouseover', toggleBounce);
  }

  // Create the infowindow.
  largeInfowindow = new google.maps.InfoWindow({});

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
      });
        // Request data from Wikipedia asynchronously.
        // Parameter one is the search term (en.wikipedia.com/wiki/<MY_SEARCH> ).
        // Parameter two is the current infowindow.
      wikiAjax(marker.wikiTitle, infowindow);

        // Pan map to display the whole infowindow.
      map.setZoom(15);
      map.panTo(marker.position);
      map.panBy(0, -450);
      map.setTilt(75);
        // Open the infowindow on the correct marker.
      infowindow.open(map, marker);
    }
  }

    // Make sure every marker can be seen on map.
  function showMarkers() {
      // Extend the boundaries of the map for each marker and display the marker
      // The variable bounds can be found at the start of this file.
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }

  showMarkers();
}
// Make a sketchy bounce toggle
function toggleBounce() {
  if (this.getAnimation() !== null) {
    this.setAnimation(null);
  } else {
    this.setAnimation(google.maps.Animation.BOUNCE);
  }
}
ko.applyBindings(MVM);
