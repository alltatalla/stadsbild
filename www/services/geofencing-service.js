angular.module('stadsbild')
  .factory(
    'GeofencingService',
    ['$ionicPlatform',
     '$window',
     '$cordovaGeolocation',
     '$cordovaBackgroundGeolocation',
     '$cordovaLocalNotification',
     'StruggleInformationService',
     function($ionicPlatform,
              $window,
              $cordovaGeolocation,
              $cordovaBackgroundGeolocation,
              $cordovaLocalNotification,
              StruggleInformationService) {

       var serviceObj = {};
       serviceObj.available = false;

       var distance = function(latlng1, latlng2) {
         // 'haversine’ formula for distance
         // http://www.movable-type.co.uk/scripts/latlong.html
         var R = 6.371e6; // Earth radius in meters
         var φ1 = Math.PI * latlng1.lat / 180.0;
         var φ2 = Math.PI * latlng2.lat / 180.0;
         var Δφ = φ2 - φ1;
         var Δλ = Math.PI * (latlng2.lng-latlng1.lng) / 180.0;

         var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
             Math.cos(φ1) * Math.cos(φ2) *
             Math.sin(Δλ/2) * Math.sin(Δλ/2);
         var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

         return R * c;
       };

       var inLocation = {};

       var locationUpdate = function(location) {
         var struggles = StruggleInformationService.savedStruggles;
         for (i = 0; i < struggles.length; ++i) {
           var d = distance(location, struggles[i]);

           if (d < struggles[i].radius && !(struggles[i].id in inLocation)) {
             // Entering a location
             $cordovaLocalNotification.add({
               id: struggles[i].id,
               message: 'En intressant plats',
               title: struggles[i].shorttitle,
             });

             inLocation[struggles[i].id] = true;
           }

           if (d > struggles[i].radius && (struggles[i].id in inLocation)) {
             // Exiting a location
             $cordovaLocalNotification.cancel(struggles[i].id);
             inLocation[struggles[i].id] = false;
           }
         }
       };

       // Start background geolocation service
       var startBackgroundGeolocation = function() {
         console.log('StartBackgroundGeolocation');
         var options = {
           // https://github.com/christocracy/cordova-plugin-background-geolocation#config
           debug: true,

           // General options
           desiredAccuracy : 10,
           stopOnTerminate : true,

           // Android options
           notificationTitle : 'Stadsbild',
           notificationText : 'Active'

           // iOS options
         };

         $cordovaBackgroundGeolocation.configure(options).then(function (location) {
           console.log('BG GEO callback');
           locationUpdate(location);
         }, function (err) {
           console.log('BG GEO error');
           serviceObj.available = false;
           console.error(err);
         });
       };

       var startGeolocation = function() {
         // begin a watch
         var options = {
           frequency : 5000, // 60000, // 60sec
           timeout : 30000,
           enableHighAccuracy: true
         };

         $cordovaGeolocation.watchPosition(options)
           .then(
             function()  { /* Not  used */ },
             function(err) {
               console.log('Error setting position watch: ' + err.code);
             }, function(position) {
               locationUpdate({
                 lat: position.coords.latitude,
                 lng: position.coords.longitude
               });
             });
       };

       // Service intialization
       $ionicPlatform.ready(function() {
         if (!($window.plugins && $window.plugins.backgroundGeoLocation)) {
           console.log("Couldn't find cordova plugins - running without them.");
           return;
         }

         //startBackgroundGeolocation();
         startGeolocation();
         //StruggleInformationService.onChange(setupLocationWatches);

         $cordovaLocalNotification.setDefaults({
           led: 'FF0000',
           autoCancel: true
         });

         $cordovaLocalNotification.onClick(function (id, state, json) {
           console.log("notification clicked: " + id);
         });

         serviceObj.available = true;
       });

       return serviceObj;
     }]);
