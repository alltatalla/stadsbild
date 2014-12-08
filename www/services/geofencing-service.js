angular.module('stadsbild')
  .factory(
    'GeofencingService',
    ['$ionicPlatform',
     '$window',
     '$cordovaBackgroundGeolocation',
     'StruggleInformationService',
     function($ionicPlatform,
              $window,
              $cordovaBackgroundGeolocation,
              StruggleInformationService) {

       var serviceObj = {};
       serviceObj.available = false;
       
       // Start background geolocation service
       $ionicPlatform.ready(function() {
         if (!($window.plugins && $window.plugins.backgroundGeoLocation)) {
           console.log("Couldn't find cordova plugins - running without them.");
           return;
         }

         var options = {
           // https://github.com/christocracy/cordova-plugin-background-geolocation#config

           // General options
           desiredAccuracy : 10,
           stopOnTerminate : true,

           // Android options
           notificationTitle : 'Stadsbild',
           notificationText : 'Active'
           
           // iOS options
         };

         $cordovaBackgroundGeolocation.configure(options).then(function (location) {
           console.log(location);
         }, function (err) {
           serviceObj.available = false;
           console.error(err);
         });

         serviceObj.available = true;
       });
       
       return serviceObj;
     }]);
