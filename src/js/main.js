var notesApp = angular.module('notesApp', ['ngCookies', 'ngRoute']);

notesApp.constant('root', '/webdav/');

notesApp.config(['$routeProvider',
function($routeProvider) {
  $routeProvider
    .when('/:fileName?', {
      templateUrl : 'view/notesCtrl.html',
      controller: 'NotesCtrl',
      resolve: {
        notes: ['notes', function (notes) {
          return notes.load();
        }]
      }
    });
}]);

notesApp.run(['$route', '$rootScope', '$location',
function ($route, $rootScope, $location) {
  var original = $location.path;
  $location.path = function (path, reload) {
    if (reload === false) {
      var lastRoute = $route.current;
      var un = $rootScope.$on('$locationChangeSuccess', function () {
        $route.current = lastRoute;
        un();
      });
    }

    return original.apply($location, [path]);
  };
}]);