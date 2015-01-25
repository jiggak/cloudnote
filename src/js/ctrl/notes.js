notesApp.controller('NotesCtrl', ['$scope', '$location', '$cookies', 'notes',
function ($scope, $location, $cookies, notes) {
  var fileName = null;
  if ($location.path() === '') {
    if ($cookies.lastfile) {
      fileName = $cookies.lastfile;
      $location.path('/' + fileName);
    }
  } else {
    fileName = $location.path().substring(1);
  }

  notes.list().then(function (notes) {
    if (fileName === null) {
      fileName = notes[0].fileName;
      $location.path('/' + fileName);
    }

    $scope.notes = notes;

    $scope.setCurrent(_.find(notes, function (f) {
      return f.fileName === fileName;
    }));
  });

  $scope.setCurrent = function (note) {
    $scope.current = note;
    $cookies.lastfile = note.fileName;
    $('.navbar-collapse.in').collapse('hide');
  };
}]);