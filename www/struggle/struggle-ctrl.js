angular
  .module('stadsbild')
  .controller('StruggleController',
     ['$scope', '$state', '$stateParams', 'StruggleInformationService',
     function($scope, $state, $stateParams, StruggleInformationService) {
       $scope.struggle = StruggleInformationService.getLocation(parseInt($stateParams.struggleId));

       $scope.showOnMap = function() {
         $state.go('map.index', {selectedStruggle: $stateParams.struggleId});  
       };
    }]);
