angular.module('stadsbild').controller('MapController',
  [ '$scope',
    '$cordovaGeolocation',
    '$ionicModal',
    '$ionicPopup',
    'GeofencingService',
    'StruggleInformationService',
    'InstructionsService',
    function(
      $scope,
      $cordovaGeolocation,
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
          paths : makePaths($scope.struggles),
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          }
        };

        var sel = StruggleInformationService.selected();
        goTo(StruggleInformationService.selected());

        StruggleInformationService.onSelect(function(id) {
          goTo(StruggleInformationService.selected());
        });
      });

      /**
       * Center map on specific saved location
       * @param locationKey
       */
      var goTo = function(id) {
        if (id == null) {
          $scope.map.bounds = StruggleInformationService.getBounds(0.1);
          $scope.map.markers = {};
          $scope.map.paths = makePaths($scope.struggles);
          return;
        }

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

        $scope.map.paths = [makePath(location)];
      };

      var makePath = function(location) {
        return {
          weight: 2,
          color: '#ff612f',
          latlngs: {
            lat: location.lat,
            lng: location.lng
          },
          radius: location.radius,
          type: 'circle'
        }
      };

      var makePaths = function(locations) {
        var paths = [];
        for (var i = 0; i < locations.length; ++i) {
          paths.push(makePath(locations[i]));
        }
        return paths;
      }

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
              lat: position.coords.latitude,
              lng: position.coords.longitude,
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
