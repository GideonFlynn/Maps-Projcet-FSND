/* eslint-disable no-unused-vars,no-undef,require-jsdoc,no-alert, no-negated-condition */

/*
 *----- LOCAL VARIABLES -----*
 */
let MVM;
let title;
let wikiTitle;
let position;

/*
 *----- REGULAR EXPRESSIONS -----*
 * RegExp to make sure links redirect properly
 * Note: The coordinates link is getting messed up. (nothing breaks though)
 */
const imageRegExp = /\/\//g;
const linkRegExp = /href="/g;

/*
 *------ AJAX CALLS ------*
 */
// Populates the infowindow with error data.
// The error data is provided by Wikimedia.
const checkRequest = (data, infowindow) => {
  infowindow.setContent(
    `<h2>The request contains an error.</h2>
     <h3>Error info: ${data.error.info}
     <br>
     Error code: ${data.error.code}
     <br></h3>
     <h5>Try again & make sure the URL is correct.
      It should match a "en.wikipedia.com" url.</h5>${data.error.docref}`
  );
};
// Make an ajax request to Wikipedia.
var wikiAjax = (url, infowindow) => {
  // Generate a url based on the markers wikiTitle.
  MVM.wikiURL = `https://en.wikipedia.org/w/api.php?action=parse&prop=info%7Ctext&page=${url}&utf8=&format=json&formatversion=2&mobileformat=1`;

  $.ajax({
    url: MVM.wikiURL,
    dataType: 'jsonp',
    type: 'GET',
    headers: {'Api-User-Agent': 'allmynameswastaken@gmail.com'},
    crossDomain: true,
    error(jqXHR, textStatus, errorThrown) {
      infowindow.setContent(
        '<p>An error has occurred.</p>'
      );
      console.log('jqXHR:');
      console.log(jqXHR);
      console.log('textStatus:', textStatus);
      console.log('errorThrown:', errorThrown);
    },
    success(data) {
      // data is a jsonp object with a predictable array, starting with parse.
      console.log(data.parse);
      // Check if the response contains an error.
      if (!data.error) {
        // Declare the root of the object.
        const rootQuery = data.parse;
        // Declare the main content of the request
        const rootContent = rootQuery.text;
        // Define the title of the wikipedia page.
        const infoTitle = rootQuery.title;

        // Go through the wikipedia page and replace all image links.
        const imgFormat = rootContent.replace(imageRegExp, 'https://');
        // Go through the wikipedia page and replace all links.
        let formattedContent = imgFormat.replace(linkRegExp, 'href="https://en.wikipedia.org');

        // Take the formatted content
        formattedContent = `<h1>This is ${infoTitle}</h1>${formattedContent}`;
        // Assign it to the content observable.
        MVM.contentString = formattedContent;

        // If nothing is present, warn the user inside the current infowindow.
        if (MVM.contentString === '') {
          infowindow.setContent(
            '<h3>An error occurred, ' +
            'try again & make sure the URL is correct.' +
            ' The URL should match a "en.wikipedia.com" url.</h3>'
          );
        } else {
          // Populate the infowindow with the formatted content.
          infowindow.setContent(MVM.contentString);
        }
      } else {
        // If an error is present, warn the user inside the current infowindow.
        checkRequest(data, infowindow);
      }
    }
  });
};

/*
 *----- MAP VARIABLES -----*
 */
let largeInfowindow;
let map;
let bounds;
let marker;
const markers = [];
const locations = [
  {
    wikiTitle: 'Chichen_Itza',
    title: 'Chichen Itza',
    location: {lat: 20.683056, lng: -88.568611}
  },
  {
    wikiTitle: 'Christ_the_Redeemer_(statue)',
    title: 'Christ the Redeemer statue',
    location: {lat: -22.951944, lng: -43.210556}
  },
  {
    wikiTitle: 'Colosseum',
    title: 'Colosseum',
    location: {lat: 41.890169, lng: 12.492269}
  },
  {
    wikiTitle: 'Great_Pyramid_of_Giza',
    title: 'Great Pyramid of Giza',
    location: {lat: 29.979175, lng: 31.134358}
  },
  {
    wikiTitle: 'Great_Wall_of_China',
    title: 'Great Wall of China',
    location: {lat: 40.68, lng: 117.23}
  },
  {
    wikiTitle: 'Machu_Picchu',
    title: 'Machu Picchu',
    location: {lat: -13.163333, lng: -72.545556}
  },
  {
    wikiTitle: 'Petra',
    title: 'Petra',
    location: {lat: 30.328611, lng: 35.441944}
  },
  {
    wikiTitle: 'Taj_Mahal',
    title: 'Taj Mahal',
    location: {lat: 27.175015, lng: 78.042155}
  },
  {
    wikiTitle: 'Uluru',
    title: 'Uluru',
    location: {lat: -25.363, lng: 131.044}
  }
];

const Place = function(data) {
  this.title = data.title;
  this.location = data.position;
  this.wikiTitle = data.wikiTitle;
  this.marker = data.marker;
  this.animation = data.animation;
};

/*
 *----- VIEW MODEL -----*
 * This is the main viewmodel.
 * It contains the search functionality.
 * It also contains the listeners needed for animations and filtering.
 */

MVM = function() {
  const self = this;
  // Google Maps need this array.
  this.locationsList = ko.observableArray([]);

  const makeLocation = () => {
    // Make each location based on the Place template.
    locations.forEach(location => {
      self.locationsList.push(new Place(location));
    });
  };
  makeLocation();

  // This observable is used for ajax calls,
  // It holds the current markers wikiTitle.
  self.wikiURL = ko.observable();

  // Observable for use with ajax content,
  // it will go through the regexp variables.
  self.contentString = ko.observable('');

  // Used to keep track of the search query.
  self.query = ko.observable('');
  self.searchLocations = value => {
    self.locationsList([]);

    for (let i = 0; i < locations.length; i++) {
      // If the lowercase version of the  search query, match a marker wikiTitle,
      // make the current location's marker visible.
      if (locations[i].wikiTitle.toLowerCase().includes(value.toLowerCase())) {
        locations[i].marker.setVisible(true);
        self.locationsList.push(locations[i]);
      } else {
        if (largeInfowindow.anchor === locations[i].marker) {
          // Close the infowindow if there's a match
          largeInfowindow.close();
        }
        // Otherwise, make the marker invisible(:O)
        locations[i].marker.setVisible(false);
      }
    }
  };

  // Subscribe the query to the filter function.
  self.query.subscribe(self.searchLocations);
  // Define how an infowindow gets populated.
  self.populateInfoWindow = (marker, infowindow) => {
    // Make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      // Clear the infowindow content to give the API time to load.
      infowindow.setContent('');
      infowindow.marker = marker;
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', () => {
        infowindow.marker = null;
        marker.setAnimation(null);
        // Move the map back to its boundaries,
        map.panBy(0, 0);
      });
      // Request data asynchronously.
      // Arg one is the search term (en.wikipedia.com/wiki/<MY_SEARCH> ).
      wikiAjax(marker.wikiTitle, infowindow);

      // Pan map to display the whole infowindow.
      map.setZoom(15);
      map.panTo(marker.position);
      map.panBy(0, -450);
      // Open the infowindow on the current marker.
      infowindow.open(map, marker);
      map.setTilt(75);
    }
  };

  /*
   *----- LISTENERS -----*
   */

  // Trigger the markers click listener.
  self.listListener = location => {
    google.maps.event.trigger(location.marker, 'click');
  };
  // Trigger the markers mouseover listener.
  self.hoverListener = location => {
    google.maps.event.trigger(location.marker, 'mouseover');
    // Bounce the marker at the location.
    location.marker.setAnimation(google.maps.Animation.BOUNCE);
  };
  // Trigger the markers mouseout listener.
  self.hoverOut = location => {
    google.maps.event.trigger(location.marker, 'mouseout');
    // Cancel the animation.
    location.marker.setAnimation(null);
  };

  // Bind button click events to functions
  self.showMarkers = showMarkers;
  self.hideMarkers = hideMarkers;
  self.showInfoWindow = showInfoWindow;
  self.zoomOut = zoomOut;
};

/*
 *----- TOGGLES -----*
 */

// Toggles the markers bounce animation
function toggleBounce() {
  // Check if current marker is animating.
  if (this.getAnimation() !== null) {
    this.setAnimation(null);
  } else {
    // If not, make it bounce!
    this.setAnimation(google.maps.Animation.BOUNCE);
  }
}
// Cancel the current animation. :(
function toggleOff() {
  return this.setAnimation(null);
}

/*
 *----- BUTTONS -----*
 */

// Display all markers on the map.
function showMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].visible = true;
    // Set marker on the map.
    markers[i].setMap(map);
    // Extend boundaries to current marker.
    bounds.extend(markers[i].position);
  }
}
// Make map display current boundaries.
function zoomOut() {
  map.fitBounds(bounds);
  largeInfowindow.close();
}
function showInfoWindow() {
  map.fitBounds(bounds);
  largeInfowindow.setMap(map);
}
// Hide all markers on the map.
function hideMarkers() {
  for (let i = 0; i < markers.length; i++) {
    // Set marker on the map.
    markers[i].setMap(null);
  }
}
