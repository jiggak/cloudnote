notesApp.directive('markdown', ['$http',
function ($http) {
  return {
    restrict: 'E',
    scope: {
      src: '='
    },
    transclude: true,
    link: function (scope, element, attrs) {
      $http.get(scope.src).success(function (html) {
        element.html(markdown.toHTML(html));

        _.each(element.find('a'), function (a) {
          var link = $(a).attr('href');

          if (link.indexOf('http') === 0) {
            // open absolute links in new tab/window
            $(a).attr('target', '_blank');
          } else {
            // assume relative links are links to other notes
            $(a).attr('href', '#/' + link);
          }
        });
      });
    }
  };
}]);