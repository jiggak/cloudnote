import * as _ from 'underscore';
import { element } from 'angular';

export interface INote {
   filePath: string;
   etag: string;
   fileName: string;
   name: string;
   content: string;
}

class Note implements INote {
   filePath: string;
   etag: string;
   fileName: string;
   name: string;
   content: string;

   constructor(filePath:string, etag:string) {
      this.filePath = filePath;
      this.etag = etag;
      this.fileName = decodeURI(this.filePath.split('/').pop());
      this.name = decodeURI(this.fileName.replace('.md', ''));
   }
}

export class NotesService {
   static $inject:string[] = ['$http', '$q', '$cookies'];

   private _current:INote;
   private notes:INote[];
   private filtered:INote[];

   constructor (
      private $http: ng.IHttpService,
      private $q: ng.IQService,
      private $cookies: ng.cookies.ICookiesService)
   { }

   load(): ng.IPromise<NotesService> {
      if (this.notes != null) {
         return this.$q.resolve(this);
      }

      let options = {
         url: '/webdav/',
         method: 'PROPFIND',
         headers: {
            Depth: 1
         }
      };

      return this.$http(options).then((response:ng.IHttpPromiseCallbackArg<{}>) => {
         let parser = new DOMParser();
         let doc = parser.parseFromString(response.data as string, 'application/xml');

         // some browsers need namespace qualification, others don't
         // try and query without the namespace, add it if query was empty
         let ns = '';
         if (element(doc).find('response').length == 0) {
            ns = 'D\:';
         }

         this.notes = _.chain(element(doc).find(`${ns}response`))
            // first child is properties response of the directory being listed
            // root etag can be used to decide if the directory listing is stale
            // $(value).find('getetag').text();
            .rest(1)
            .map((node) => {
               let filePath = element(node).find(`${ns}href`).text();
               let etag = element(node).find(`${ns}getetag`).text();
               return new Note(filePath, etag);
            })
            .sortBy('name')
            .value();

         return this;
      });
   }

   get list():INote[] {
      return this.filtered != null ? this.filtered : this.notes;
   }

   search(search:string) {
      if (!search) {
         this.filtered = null;
         return;
      }

      search = search.toLowerCase();

      let terms = _.filter(search.split(' '), (s) => {
         return s !== '';
      });

      if (terms.length > 0) {
         this.filtered = _.filter(this.notes, (note) => {
            let name = note.name.toLowerCase();

            if (terms.length == 1) {
               return name.indexOf(terms[0]) >= 0;
            } else {
               let names = _.first(name.split(' '), terms.length);
               return _.every(names, function (n, i) {
                  return n.indexOf(terms[i]) >= 0;
               });
            }
         });

         if (this.filtered.length > 0) {
            this.current = this.filtered[0];
         }
      }
   }

   setCurrentByFileName(fileName:string) {
      let current = _.findWhere(this.notes, {fileName: fileName});
      if (current) {
         this.current = current;
      }
   }

   get current():INote {
      return this._current;
   }

   set current(note:INote) {
      this.$http.get(note.filePath).then((response:ng.IHttpPromiseCallbackArg<{}>) => {
         note.content = response.data as string;
      });

      this._current = note;

      this.$cookies.put('lastFile', note.fileName);
   }

   get lastFile():string {
      return this.$cookies.get('lastFile');
   }
}
