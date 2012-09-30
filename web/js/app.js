var WebDAVRoot = "/webdav/";

function Document (response) {
  this.filePath = $(response).find("href").text();
  this.fileName = this.filePath.split("/").pop();
  this.name = unescape(this.fileName.replace(".md", ""));
  this.etag = $(response).find("getetag").text();
}

Document.prototype.load = function() {
  var self = this;
  jQuery.ajax(self.filePath, {
    success: function (data, status, request) {
      app.onLoadDoc(data, self);
    },
    error: app.onError
  });
};

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

  onLoadDoc: function(data, doc) {
    $("#docview").html(markdown.toHTML(data));

    // update selected item in documents list
    $("#docslist .active").removeClass("active");
    $("#docslist > li:eq("+app.docs.indexOf(doc)+")").addClass("active");

    // set page title
    $("head > title").text(doc.name);

    // search for document links and convert to hash(#) links
    $("#docview a").each(function () {
      var link = $(this).attr("href");

      if (link.indexOf("http") == 0) {
        // open absolute links in new tab/window
        $(this).attr("target", "_blank");
      } else {
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
        app.docs.push(new Document(value));
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
    var doc = app.findDocWithFileName(fileName);

    $.cookie("lastfile", fileName, { expires: 30 });

    doc.load(); // load document asyncronosly
  });

  var lastFile = $.cookie("lastfile");
  if (lastFile != null) {
    location.hash = "#" + lastFile;
  }

  app.load();
});