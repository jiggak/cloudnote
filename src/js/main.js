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