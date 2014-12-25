notesApp.factory('Note', function ($http) {
  function Note(response) {
    this.filePath = $(response).find('href').text();
    this.fileName = unescape(this.filePath.split('/').pop());
    this.name = unescape(this.fileName.replace('.md', ''));
    this.etag = $(response).find('getetag').text();
  }

  Note.prototype.get = function() {
    return $http.get(this.filePath);
  };

  return Note;
});