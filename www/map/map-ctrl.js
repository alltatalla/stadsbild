angular.module('stadsbild').controller('MapController',
  [ '$scope',
    '$cordovaGeolocation',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    'GeofencingService',
    'StruggleInformationService',
    'InstructionsService',
    function(
      $scope,
      $cordovaGeolocation,
      $stateParams,
      $ionicModal,
      $ionicPopup,
      GeofencingService,
      StruggleInformationService,
      InstructionsService
      ) {


      /**
       * Once state loaded, get put map on scope.
       */
      $scope.$on("$stateChangeSuccess", function() {

        $scope.struggles = StruggleInformationService.savedStruggles;
        $scope.newLocation;

        InstructionsService.showInstructionOnce(InstructionsService.instructions.newLocations);
        $scope.map = {
          defaults: {
            //tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            tileLayer: 'http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
            //tileLayer: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png',
            maxZoom: 18,
            zoomControlPosition: 'bottomleft',
            attributionControl: false,
          },
          center: {},
          bounds: StruggleInformationService.getBounds(0.1),
          markers : {},
          paths : {},
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          }
        };

        if ($stateParams.selectedStruggle != null) {
          goTo(parseInt($stateParams.selectedStruggle));
        }
        //else {
          //$scope.locate();
        //}

      });

      $ionicModal.fromTemplateUrl('map/add-location.tpl.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
        });

      /**
       * Detect user long-pressing on map to add new location
       */
      $scope.$on('leafletDirectiveMap.contextmenu', function(event, locationEvent){
        $scope.newLocation = {
          name : "",
          lat : locationEvent.leafletEvent.latlng.lat,
          lng : locationEvent.leafletEvent.latlng.lng,
          radius: 100
        };
        $scope.modal.show();
      });

      $scope.saveLocation = function() {
        StruggleInformationService.savedStruggles.push($scope.newLocation);
        $scope.modal.hide();
        goTo(StruggleInformationService.savedStruggles.length - 1);
      };

      /**
       * Center map on specific saved location
       * @param locationKey
       */
      var goTo = function(id) {

        var location = StruggleInformationService.getLocation(id);

        $scope.map.center  = {
          lat : location.lat,
          lng : location.lng,
          zoom : 15
        };

        $scope.map.markers = [{
          lat:location.lat,
          lng:location.lng,
          message: location.name,
          focus: true,
          draggable: false
        }];

        $scope.map.paths = [{
          weight: 2,
          color: '#ff612f',
          latlngs: {
            lat: location.lat,
            lng: location.lng
          },
          radius: location.radius,
          type: 'circle'
        }];
      };

      /**
       * Center map on user's current position
       */
      $scope.locate = function(){

        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {
            $scope.map.center.lat  = position.coords.latitude;
            $scope.map.center.lng = position.coords.longitude;
            $scope.map.center.zoom = 15;

            $scope.map.markers.now = {
              lat:position.coords.latitude,
              lng:position.coords.longitude,
              message: "You Are Here",
              focus: true,
              draggable: false
            };

          }, function(err) {
            // error
            console.log("Location error!");
            console.log(err);
          });

      };
    }]);
