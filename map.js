this.google = ko.observable(!!window.google); // true
if (category === "Nothing"){
    setTimeout(initMap, 400);
}
function initMap() {

      console.log(category);
      var home = {lat: 56.816599, lng: 8.383835};
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: home
      });
      var infowindow = new google.maps.InfoWindow({
          content: category
      });

      var marker = new google.maps.Marker({
          position: home,
          map: map,
          title: 'My home!'
      });
      marker.addListener('click', function () {
          infowindow.open(map, marker);
      })}