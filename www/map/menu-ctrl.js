angular.module('stadsbild').controller('MenuController',
  [ '$scope',
    '$state',
    '$stateParams',
    '$ionicSideMenuDelegate',
    'StruggleInformationService',
    'InstructionsService',
    function(
      $scope,
      $state,
      $stateParams,
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
        $state.go('map.index', {selectedStruggle: id});  
      };

    }]);
