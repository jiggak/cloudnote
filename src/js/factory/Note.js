notesApp.factory('Note', function ($http) {
  function Note(response) {
    this.filePath = $(response).find('D\\:href, href').text();
    this.fileName = unescape(this.filePath.split('/').pop());
    this.name = unescape(this.fileName.replace('.md', ''));
    this.etag = $(response).find('lp1\\:getetag, getetag').text();
  }

  Note.prototype.get = function() {
    return $http.get(this.filePath);
  };

  return Note;
});