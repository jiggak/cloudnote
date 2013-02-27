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

* [Bootstrap](http://twitter.github.com/bootstrap/)
* [jquery 1.7.2](http://jquery.com/)
* [jquery.dav.js](https://github.com/sandro-pasquali/jquery.dav)
* [jquery.ba-hashchange.js](https://github.com/cowboy/jquery-hashchange)
* [jquery.jqtemplate.js](http://www.slashdev.ca/jqtemplate/)
* [markdown.js](https://github.com/evilstreak/markdown-js)
* [jquery.cookie.js](https://github.com/carhartl/jquery-cookie)