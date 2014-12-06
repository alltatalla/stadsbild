// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('stadsbild', ['ionic', 'leaflet-directive', 'ngCordova', 'igTruncate'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
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
      .state('location', {
        url: '/location/:locationId',
        templateUrl: "location/location.tpl.html",
        controller: 'LocationController'
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
