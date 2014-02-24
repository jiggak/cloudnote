## Apache Setup

The `/recipes` alias relies on [mod_markdown](https://github.com/hamano/apache-mod-markdown)
for generating HTML from markdown documents.

	<VirtualHost *:80>
	    ServerName foodie.com

	    # web interface files
	    DocumentRoot /foodie/htdocs
	    <Directory /foodie/htdocs>
	        AllowOverride All
	        Order allow,deny
	        Allow from all
	    </Directory>

	    # expose the markdown files in a separate URI that outputs HTML
	    Alias /recipes /foodie/recipes
	    <Location /recipes>
	        Options Indexes
	        AddHandler markdown .md
	        Order allow,deny
	        Allow from all
	    </Location>

	    # markdown files accessible through WebDAV
	    Alias /webdav /foodie/recipes
	    <Location /webdav>
	        DAV On

	        AuthType Basic
	        AuthName "Recipe WebDAV Login"
	        AuthUserFile /foodie/htpasswd

	        Options Indexes

	        Order allow,deny
	        Allow from all

	        # all read-only requests are anonymous
	        <LimitExcept GET OPTIONS PROPFIND>
	            Require valid-user
	        </LimitExcept>
	    </Location>
	</VirtualHost>

## Third Party Bits

Projects used in this software:

* [AngularJS](http://angularjs.org/)
* [Bootstrap](http://twitter.github.com/bootstrap/)
* [jquery 1.11.0](http://jquery.com/)
* [jquery.dav.js](https://github.com/sandro-pasquali/jquery.dav)
* [markdown.js](https://github.com/evilstreak/markdown-js)
