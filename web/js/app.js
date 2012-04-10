var WebDAVRoot = "/webdav/";

var Document = function(response) {
  var filePath = $(response).find("href").text();
  var fileName = filePath.split("/").pop();
  var name = unescape(fileName.replace(".md", ""));
  var etag = $(response).find("getetag").text();

  return {
    name: name,
    filePath: filePath,
    fileName: fileName,
    etag: etag
  }
}

var app = {
  docs: [],       // array of document objects in root

  rootEtag: null, // etag of root documents directory

  findDocWithFileName: function(fileName) {
    var docs = app.docs;
    for (var i=0; i<docs.length; i++) {
      if (docs[i].fileName == fileName) {
        return docs[i];
      }
    }

    return null;
  },

  onError: function(request, status, error) {
    console.log("request error");
  },

  onLoadDoc: function(data, status, request) {
    $("#docview").html(markdown.toHTML(data));

    // search for document links and convert to hash(#) links
    $("#docview a").each(function () {
      var link = $(this).attr("href");

      if (link.indexOf("http") == 0) {
        // open absolute links in new tab/window
        $(this).attr("target", "_blank");
      } else {
        var doc = app.findDocWithFileName(link);
        if (doc != null) {
          $(this).attr("href", "#" + link);
        }
      }
    });
  },

  onFolderListResult: function(data, status, request) {
    $(data).find("response").each(function(index, value) {
      // first child is the properties response of the directory being listed
      if (index == 0) {
        app.rootEtag = $(value).find("getetag").text();
      } else {
        app.docs.push(Document(value));
      }
    });

    // sort documents in ascending order by name
    app.docs.sort(function(a, b) {
      if(a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });

    app.onLoadList();
  },

  onRootPropFindResult: function(data, status, request) {
    var etag = $(data).find("getetag").text();
    if (etag != app.rootEtag) {
      app.docs = [];
      app.load();
    }
  },

  onLoadList: function() {
    $("#doclist-template > li").jqtemplate(
      {docs: app.docs},
      {root: "#docslist"}
    );

    $(window).hashchange();
  },

  load: function() {
    if (this.docs.length == 0) {
      jQuery.Dav(WebDAVRoot).readFolder({
        success: this.onFolderListResult,
        error: this.onError
      });
    } else {
      jQuery.Dav(WebDAVRoot).getAllProperties({
        headers: {depth: 0},
        success: this.onRootPropFindResult,
        error: this.onError
      });
    }
  }
};

$().ready(function() {
  $(window).hashchange(function() {
    if (location.hash == "") {
      return;
    }

    var fileName = location.hash.substring(1);
    var filePath = WebDAVRoot + fileName;
    jQuery.ajax(filePath, {
      success: app.onLoadDoc,
      error: app.onError
    });

    $("#docslist .active").removeClass("active");

    var doc = app.findDocWithFileName(fileName);
    var index = app.docs.indexOf(doc);
    $("#docslist > li:eq("+index+")").addClass("active");
  });

  app.load();
});