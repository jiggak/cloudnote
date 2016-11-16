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

    list: function (searchTerms) {
      if (searchTerms) {
        searchTerms = searchTerms.toLowerCase();

        var terms = _.filter(searchTerms.split(' '), function (s) {
          return s !== "";
        });

        if (terms.length > 0) {
          var match = _.find(locals.notes, function (note) {
            var name = note.name.toLowerCase();

            if (terms.length == 1) {
              return name.indexOf(terms[0]) >= 0;
            } else {
              var names = _.first(name.split(' '), terms.length);
              return _.every(names, function (n, i) {
                return n.indexOf(terms[i]) >= 0;
              });
            }
          });

          if (match) {
            self.current(match);
          }
        }
      }

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
