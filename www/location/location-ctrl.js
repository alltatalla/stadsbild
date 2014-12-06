angular
  .module('stadsbild')
  .controller('LocationController',
     ['$scope', '$stateParams', 'LocationsService',
     function($scope, $stateParams, LocationsService) {
       $scope.location = LocationsService.getLocation(parseInt($stateParams.locationId));
    }]);
