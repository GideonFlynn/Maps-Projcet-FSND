/* eslint-disable  */
/*
 *----- REGULAR EXPRESSIONS -----*
 * RegExp to make sure links redirect properly
 * Note: The coordinates link is getting messed up. (nothing breaks though)
 */
var imageRegExp = /\/\//g;
var linkRegExp = /href="/g;

var Place = function(data) {
  this.title = data.title;
  this.location = data.position;
  this.wikiTitle = data.wikiTitle;
  this.marker = data.marker;
  this.animation = data.animation;
};
/*
 *----- LOCAL VARIABLES -----*
 */
var MVM;
var title;
var wikiTitle;
var position;
var locations = [
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
/*
 *----- MAP VARIABLES -----*
 */
var largeInfowindow;
var map;
var bounds;
var marker;
var markers = [];
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
        color: '#4CAF50'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#43A047'
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
        color: '#2196F3'
      }
    ]
  }
];
