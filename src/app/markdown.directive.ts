import * as marked from 'marked';
import app from './app.module';

app.directive('markdown', markdown);

function markdown():ng.IDirective {
   return {
      restrict: 'E',
      scope: { src: '=' },
      transclude: true,
      link: markdownLinkFn
   };
}

let markedRenderer = new marked.Renderer();
markedRenderer.link = markedLinkRenderer;
function markedLinkRenderer(href:string, title:string, text:string):string {
   let target = '_self';

   if (href.indexOf('http') === 0) {
      // open absolute links in new tab
      target = '_blank';
   } else {
      // assume relative links are linking to other notes
      href = '#/' + href;
   }

   return `<a href="${href}" target="${target}" title="${title}">${text}</a>`;
}

function markdownLinkFn(scope, element, attrs) {
   scope.$watch('src', sourceWatch);

   function sourceWatch(src) {
      if (src) {
         element.html(marked(src, {renderer: markedRenderer}));
      }
   }
}
