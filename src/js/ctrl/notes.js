notesApp.controller('NotesCtrl', function ($scope, $location, $cookies, notes) {
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
    note.get().then(function (result) {
      $('#content').html(markdown.toHTML(result.data));

      $('#content a').each(function () {
        var link = $(this).attr('href');

        if (link.indexOf('http') === 0) {
          // open absolute links in new tab/window
          $(this).attr('target', '_blank');
        } else {
          // assume relative links are links to other notes
          $(this).attr('href', '#/' + link);
        }
      });

      $('.navbar-collapse.in').collapse('hide');
    });
  };
});