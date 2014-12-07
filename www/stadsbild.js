angular.module('stadsbild', ['ionic', 'leaflet-directive', 'ngCordova', 'igTruncate'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        window.cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('map', {
        url: "/map",
        abstract: true,
        templateUrl: "map/menu.tpl.html",
        controller: 'MapController'
      })
      .state('map.index', {
        url: "/index",
        views: {
          'menuContent' : {
             templateUrl: "map/index.tpl.html"
           }}
      })
      .state('struggle', {
        url: '/struggle/:struggleId',
        templateUrl: "struggle/struggle.tpl.html",
        controller: 'StruggleController'
      })
      .state('settings', {
        url: "/settings",
        templateUrl: "settings/settings.tpl.html",
        controller: 'SettingsController'
      })
      .state('about', {
        url: "/about",
        templateUrl: "about/about.tpl.html"
      });


    $urlRouterProvider.otherwise('/map/index');

  });
