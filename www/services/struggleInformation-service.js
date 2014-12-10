angular.module('stadsbild').factory('StruggleInformationService', [ function() {

  var strugglesObj = {};

  strugglesObj.savedStruggles = [
    {
      id : 1,
      name : "Kungsan",
      lat : 59.330387511,
      lng : 18.072016239,
      radius : 100
    },
    {
      id : 2,
      name : "Stadskampsinvigning",
      lat : 59.332762593,
      lng : 18.069527149,
      radius : 50
    },
    {
      id : 3,
      name : "Antifa",
      lat : 59.334836514,
      lng : 18.062199354,
      radius : 50
    }

  ];

  strugglesObj.getLocation = function(id) {
    locList = strugglesObj.savedStruggles;

    for (i = 0; i < locList.length; ++i) {
      if (locList[i].id === id)
        return locList[i];
    }

    return undefined;
  };

  strugglesObj.getBounds = function(margin) {
    locList = strugglesObj.savedStruggles;
    bounds = { northEast: {
        lat: locList[0].lat,
        lng: locList[0].lng
      },
      southWest: {
        lat: locList[0].lat,
        lng: locList[0].lng
      }};

    for (i = 1; i < locList.length; ++i) {
      bounds.northEast.lat = Math.max(bounds.northEast.lat, locList[i].lat);
      bounds.southWest.lat = Math.min(bounds.southWest.lat, locList[i].lat);

      // This only works on the eastern hemisphere
      bounds.northEast.lng = Math.max(bounds.northEast.lng, locList[i].lng);
      bounds.southWest.lng = Math.min(bounds.southWest.lng, locList[i].lng);
    }

    if (margin) {
      dlat = margin * (bounds.northEast.lat - bounds.southWest.lat);
      dlng = margin * (bounds.northEast.lng - bounds.southWest.lng);

      bounds.northEast.lat += dlat;
      bounds.southWest.lat -= dlat;

      // This only works on the eastern hemisphere
      bounds.northEast.lng += dlng;
      bounds.southWest.lng -= dlng;
    }

    return bounds;
  };

  return strugglesObj;

}]);
