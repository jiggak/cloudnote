notesApp.controller('NotesCtrl', ['$scope', '$routeParams', '$location', 'notes',
function ($scope, $routeParams, $location, notes) {
  if ($routeParams.fileName) {
    notes.current($routeParams.fileName);
  }

  $scope.notes = function (searchTerms) {
    return notes.list(searchTerms);
  };

  $scope.current = notes.current;

  $scope.$watch('current()', function (note) {
    $location.path(note.fileName, false);
    $('.navbar-collapse.in').collapse('hide');
  });
}]);