angular.module('stadsbild').controller('MenuController',
  [ '$scope',
    '$state',
    '$ionicSideMenuDelegate',
    'StruggleInformationService',
    'InstructionsService',
    function(
      $scope,
      $state,
      $ionicSideMenuDelegate,
      StruggleInformationService,
      InstructionsService) {

      $scope.struggles = StruggleInformationService.savedStruggles;

      $scope.menu = {
        struggles : {
          expanded : true,
        },

        categories : {
          expanded : true,
          newsSelected : true,
          cityStruggleSelected : true,
          workersStruggleSelected : true,
        },

        other : {
          expanded : false,
        }
      };

      $scope.selectStruggle = function(id) {
        $ionicSideMenuDelegate.toggleLeft(false);
        var oldSel = StruggleInformationService.selected();
        if (oldSel === id)
          StruggleInformationService.select(null);
        else
          StruggleInformationService.select(id);
      };

      $scope.selectedStruggle = function(id) {
        var sid = StruggleInformationService.selected();
        return sid != null && sid === id;
      };
    }]);
