notesApp.controller('NotesCtrl', ['$scope', '$route', '$routeParams', 'notes',
function ($scope, $route, $routeParams, notes) {
  if ($routeParams.fileName) {
    notes.current($routeParams.fileName);
  }

  $scope.notes = function () {
    return notes.list();
  };

  $scope.current = function (note) {
    return notes.current(note);
  };
}]);