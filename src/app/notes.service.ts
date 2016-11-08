import Note from './note';
import * as _ from 'underscore';
import { element } from 'angular';

export class NotesService {
   static $inject:string[] = ['$http'];
   
   constructor (private $http: ng.IHttpService) { }

   list(): ng.IPromise<Note[]> {
      let options = {
         url: '/webdav/',
         method: 'PROPFIND',
         headers: {
            Depth: 1
         }
      };

      return this.$http(options).then(function(response:ng.IHttpPromiseCallbackArg<{}>) {
         let parser = new DOMParser();
         let doc = parser.parseFromString(response.data as string, 'application/xml');

         let toNote = function(node):Note {
            let filePath = element(node).find('href').text();
            let etag = element(node).find('getetag').text();
            return new Note(filePath, etag);
         };

         return _.chain(element(doc).find('response'))
            // first child is properties response of the directory being listed
            // root etag can be used to decide if the directory listing is stale
            // $(value).find('getetag').text();
            .rest(1)
            .map(toNote)
            .sortBy('name')
            .value();
      })
   }
}
