angular.module('stadsbild').factory('InstructionsService', [ function() {

  var instructionsObj = {};

  instructionsObj.instructions = {
    newLocations : {
      text : 'To add a new location, tap and hold on the map',
      seen : true
    }
  };

  return instructionsObj;

}]);
