notesApp.service('notes', function ($q, $rootScope, $http, root,  Note) {
  return {
    list: function() {
      var deferred = $q.defer();

      jQuery.Dav(root).readFolder({
        error: console.log,
        success: function (data) {
          var notes = _.chain($(data).find('D\\:response, response'))
            // first child is properties response of the directory being listed
            // root etag can be used to decide if the directory listing is stale
            // $(value).find('getetag').text();
            .rest(1)
            .map(function (x) { return new Note(x); })
            .sortBy('name')
            .value();

          $rootScope.$apply(function () {
            deferred.resolve(notes);
          });
        }
      });

      return deferred.promise;
    }
  };
});
