angular.module('stadsbild')
.factory('InstructionsService', ['$ionicPopup', function($ionicPopup) {

  var instructionsObj = {};

  instructionsObj.instructions = {
    newLocations : {
      title : "Add Locations",
      text : 'To add a new location, tap and hold on the map',
      seen : true
    }
  };

  instructionsObj.showInstructionOnce = function(instruction) {
    if(instruction.seen)
      return;

    var popup = $ionicPopup.alert({
      title: instruction.title,
      template: instruction.text
    });
    popup.then(function(res) {
      instruction.seen = true;
    });
  };

  return instructionsObj;

}]);
