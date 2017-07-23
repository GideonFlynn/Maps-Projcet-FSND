/* eslint-disable no-unused-vars,no-undef,require-jsdoc,no-alert, no-negated-condition */
/*
 ----- MAP VARIABLES -----
 */
var largeInfowindow;
var map;
var bounds;
var marker;
var markers = [];
/*
 ----- LOCAL VARIABLES -----
 */
var searchLocations;
var title;
var wikiTitle;
var position;
var locations = [
  {
    wikiTitle: 'Taj_ahal',
    title: 'Taj Mahal',
    location: {lat: 27.175015, lng: 78.042155}
  },
  {
    wikiTitle: 'uluru',
    title: 'Uluru',
    location: {lat: -25.363, lng: 131.044}
  },
  {
    wikiTitle: 'Christ_the_Redeemer_(statue)',
    title: 'The Christ the Redeemer statue',
    location: {lat: -22.951944, lng: -43.210556}
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
    wikiTitle: 'Petra',
    title: 'Petra',
    location: {lat: 30.328611, lng: 35.441944}
  },
  {
    wikiTitle: 'Colosseum',
    title: 'Colosseum',
    location: {lat: 41.890169, lng: 12.492269}
  },
  {
    wikiTitle: 'Chichen_Itza',
    title: 'Chichen Itza',
    location: {lat: 20.683056, lng: -88.568611}
  },
  {
    wikiTitle: 'Machu_Picchu',
    title: 'Machu Picchu',
    location: {lat: -13.163333, lng: -72.545556}
  }
];

// Define what data a location has.
// A template for locations.
var Place = function(data) {
  this.title = data.title;
  this.location = data.position;
  this.wikiTitle = data.wikiTitle;
  this.marker = data.marker;
  this.animation = data.animation;
};
/*
 ----- REGULAR EXPRESSIONS -----
 */
// RegExp to make sure links redirect properly
// Note: The coordinates link are getting messed up.(nothing breaks though)
var imageRegExp = /\/\//g;
var linkRegExp = /href="/g;

/*
 ----- VIEW MODEL -----
 This is the main viewmodel,
 It contains the search functionality.
 It also contains the listeners needed for animations.
 */
var MVM;
MVM = function() {
  var self = this;
  // Google Maps need this empty array
  this.locationsList = ko.observableArray([]);
  // wikiURL is used to make a dynamic string.
  // The string is is a parameter from populateInfoWindow(),
  // The url is the current markers title, the function is located in map.js.
  self.wikiURL = ko.observable();
  // Observable for use with ajax content,
  // it will go through the regexp variables.
  self.contentString = ko.observable('');

  // Make each location with the Place template.
  locations.forEach(function(location) {
    self.locationsList.push(new Place(location));
  });

  searchLocations = function() {
    // Declare variables
    var input;
    var filter;
    var ul;
    var li;
    var a;
    var i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('myUL');
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName('a')[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  };
  /*
   ----- LISTENERS -----
   */
  self.listListener = function(location) {
    // Sketchily close the previous InfoWindow object.
    // This doesn't happen. :(
    if (largeInfowindow.open() === true) {
      console.log('largeInfoWindow open, closing it to make new content.');
      largeInfowindow.close();
    } else {
      // Trigger the markers click listener.
      google.maps.event.trigger(location.marker, 'click');
      // Drop the marker at the location.
      location.marker.setAnimation(google.maps.Animation.DROP);
    }
  };
  self.hoverListener = function(location) {
    // Trigger the markers mouseover listener.
    google.maps.event.trigger(location.marker, 'mouseover');
    // Bounce the marker at the location.
    location.marker.setAnimation(google.maps.Animation.BOUNCE);
  };
  self.hoverOut = function(location) {
    // Trigger the markers mouseout listener.
    google.maps.event.trigger(location.marker, 'mouseout');
    // Cancel the animation.
    location.marker.setAnimation(null);
  };
};

// Make a GET request to Wikipedia.
// url is the current markers title.
wikiAjax = function(url, infowindow) {
  // Generate a url based on the markers title.
  MVM.wikiURL = 'https://en.wikipedia.org/w/api.php?action=parse&prop=info%7Ctext&page=' + url + '&utf8=&format=json&formatversion=2&mobileformat=1';

  $.ajax({
    url: MVM.wikiURL,
    dataType: 'jsonp',
    type: 'GET',
    headers: {'Api-User-Agent': 'allmynameswastaken@gmail.com'},
    crossDomain: true,
    error: function(jqXHR, textStatus, errorThrown) {
      alert('An error occurred... Look at the console ' +
        '(F12 or Ctrl+Shift+I, Console tab)' +
        ' for more information!');
      $('#result').html(
        '<p>status code: ' +
        jqXHR.status +
        '</p><p>errorThrown: ' +
        errorThrown +
        '</p><p>jqXHR.responseText:</p><div>' +
        jqXHR.responseText +
        '</div>'
      );
      console.log('jqXHR:');
      console.log(jqXHR);
      console.log('textStatus:');
      console.log(textStatus);
      console.log('errorThrown:');
      console.log(errorThrown);
    },
    // data is a jsonp object with a predictable array, starting with parse.
    success: function(data) {
      // Check if the response contains an error.
      console.log(data);
      if (data.error) {
        // If an error is present, warn the user.
        infowindow.setContent(
          '<h2>The request contains an error.</h2>' +
          '<h3>' +
          'Error info: ' +
           data.error.info +
          '<br>' +
          'Error code: ' +
           data.error.code +
          '<br>' +
          '</h3>' +
          '<h5>' +
          'Try again & make sure the URL is correct. ' +
          'It should match a "en.wikipedia.com" url.</h5>' +
           data.error.docref
        );
      } else {
        // The root of the object.
        var rootQuery = data.parse;
        // Content og the object
        var rootContent = rootQuery.text;
        // Define the title of the wiki-page.
        var infoTitle = rootQuery.title;
        // Go through the text of the wiki-page and replace all links.
        var imgFormat = rootContent.replace(imageRegExp, 'https://');
        // Go through the text of the wiki-page and replace all image references.
        var formattedContent = imgFormat.replace(linkRegExp, 'href="https://en.wikipedia.org');

        // Take the formatted strings and display the wiki-page's title and the text.
        formattedContent =
          '<h1>This is ' + infoTitle + '</h1>' + formattedContent;
        // Assign the formatted content to the content observable.
        MVM.contentString = formattedContent;
        if (MVM.contentString === '') {
          infowindow.setContent(
            '<h3>An error occurred, ' +
            'try again & make sure the URL is correct.' +
            ' The URL should match a "en.wikipedia.com" url.</h3>'
          );
        } else {
          infowindow.setContent(MVM.contentString);
        }
      }
    }
  });
};
/*
 ----- ANIMATION TOGGLES -----
 */

// Toggles the markers bounce animation
function toggleBounce() {
  'use strict';
  // Check if current marker is animating.
  if (this.getAnimation() !== null) {
    this.setAnimation(null);
  } else {
    // If not, make it bounce!
    this.setAnimation(google.maps.Animation.BOUNCE);
  }
}
function toggleOff() {
  'use strict';
  // Cancel the current animation. :(
  return this.setAnimation(null);
}

MVM = new MVM();
ko.applyBindings(MVM);
