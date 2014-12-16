angular
  .module('stadsbild')
  .controller('StruggleController',
     ['$scope', '$state', '$stateParams', 'StruggleInformationService',
     function($scope, $state, $stateParams, StruggleInformationService) {

       var sid = parseInt($stateParams.struggleId);
       $scope.struggle = StruggleInformationService.getLocation(sid);

       $scope.showOnMap = function() {
         StruggleInformationService.select(sid);
         $state.go('map.index');
       };
    }]);
