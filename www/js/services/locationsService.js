angular.module('stadsbild').factory('LocationsService', [ function() {

  var locationsObj = {};

  locationsObj.savedLocations = [
    {
      id : 1,
      name : "Kungsan",
      lat : 59.330387511,
      lng : 18.072016239
    },
    {
      id : 2,
      name : "Stadskampsinvigning",
      lat : 59.332762593,
      lng : 18.069527149
    },
    {
      id : 3,
      name : "Antifa",
      lat : 59.334836514,
      lng : 18.062199354
    }

  ];

  locationsObj.getLocation = function(id) {
    locList = locationsObj.savedLocations;

    for (i = 0; i < locList.length; ++i) {
      if (locList[i].id === id)
        return locList[i];
    }

    return undefined;
  };

  return locationsObj;

}]);
