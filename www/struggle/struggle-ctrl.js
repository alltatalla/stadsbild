angular
  .module('stadsbild')
  .controller('StruggleController',
     ['$scope', '$stateParams', 'StruggleInformationService',
     function($scope, $stateParams, StruggleInformationService) {
       $scope.struggle = StruggleInformationService.getLocation(parseInt($stateParams.struggleId));
    }]);
