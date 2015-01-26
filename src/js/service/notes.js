notesApp.service('notes', ['$q', '$rootScope', '$cookies', '$http', 'root', 'Note',
function ($q, $rootScope, $cookies, $http, root, Note) {
  var locals = {
    notes: [],
    current: null
  };

  var self = {
    load: function () {
      var deferred = $q.defer();

      jQuery.Dav(root).readFolder({
        error: console.log,
        success: function (data) {
          locals.notes = _.chain($(data).find('D\\:response, response'))
            // first child is properties response of the directory being listed
            // root etag can be used to decide if the directory listing is stale
            // $(value).find('getetag').text();
            .rest(1)
            .map(function (x) { return new Note(x); })
            .sortBy('name')
            .value();

          locals.current = _.findWhere(locals.notes, {fileName: $cookies.lastFile});
          if (!locals.current) {
            locals.current = locals.notes[0];
            $cookies.lastFile = locals.current.fileName;
          }

          $rootScope.$apply(function () {
            deferred.resolve(self);
          });
        }
      });

      return deferred.promise;
    },

    list: function () {
      return locals.notes;
    },

    current: function (note) {
      if (angular.isDefined(note)) {
        if (angular.isString(note)) {
          $cookies.lastFile = note;
        } else {
          $cookies.lastFile = note.fileName;
        }

        locals.current = _.findWhere(locals.notes, {fileName: $cookies.lastFile});
      } else {
        return locals.current;
      }
    }
  };

  return self;
}]);
