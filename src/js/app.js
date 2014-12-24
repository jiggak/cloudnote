var WebDAVRoot = '/webdav/';

var notesApp = angular.module('notesApp', ['ngCookies']);

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

  notes.list().then(function (result) {
    if (fileName === null) {
      fileName = result[0].fileName;
      $location.path('/' + fileName);
    }

    $scope.notes = result;

    angular.forEach(result, function (n) {
      if (n.fileName == escape(fileName)) {
        $scope.setCurrent(n);
      }
    });
  });

  $scope.setCurrent = function (note) {
    $scope.current = note;
    $cookies.lastfile = note.fileName;
    notes.get(note).then(function (result) {
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

notesApp.factory('Note', function () {
  return function (response) {
    this.filePath = $(response).find('href').text();
    this.fileName = this.filePath.split('/').pop();
    this.name = unescape(this.fileName.replace('.md', ''));
    this.etag = $(response).find('getetag').text();
  };
});

notesApp.service('notes', function ($q, $rootScope, $http, Note) {
  return {
    list: function() {
      var deferred = $q.defer();

      jQuery.Dav(WebDAVRoot).readFolder({
        error: console.log,
        success: function (data) {
          var notes = [];

          $(data).find('response').each(function(index, value) {
            // first child is properties response of the directory being listed
            // root etag can be used to decide if the directory listing is stale
            // $(value).find('getetag').text();
            if (index !== 0) {
              notes.push(new Note(value));
            }
          });

          $rootScope.$apply(function () {
            deferred.resolve(notes);
          });
        }
      });

      return deferred.promise;
    },

    get: function(note) {
      return $http.get(note.filePath);
    }
  };
});
