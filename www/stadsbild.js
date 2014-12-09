angular.module('stadsbild', ['ionic', 'leaflet-directive', 'ngCordova', 'igTruncate'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('map', {
        url: "/map",
        abstract: true,
        templateUrl: "map/index.tpl.html"
      })
      .state('map.index', {
        url: "/index?selectedStruggle",
        views: {
          'mapView' : {
            templateUrl: "map/map.tpl.html",
            controller: 'MapController'
          },
          'menuView' : {
             templateUrl: "map/menu.tpl.html",
             controller: 'MenuController'
          }
        }
      })
      .state('struggle', {
        url: '/struggle/{struggleId}',
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
