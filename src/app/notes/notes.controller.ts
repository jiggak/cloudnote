import {NotesService, INote} from './notes.service'; NotesService;

export class NotesController {
   static $inject:string[] = ['$routeParams', '$location', 'loadedNotesService'];

   search:string;

   constructor(
      private $routeParams:ng.route.IRouteParamsService,
      private $location:ng.ILocationService,
      private service:NotesService)
   {
      let fileName = $routeParams['fileName'];
      if (fileName) {
         service.setCurrentByFileName(fileName);
      } else if (service.lastFile) {
         $location.path(service.lastFile);
      } else {
         $location.path(service.list()[0].fileName);
      }
   }

   list(search:string):INote[] {
      return this.service.list(search);
   }

   get current():INote {
      return this.service.current;
   }

   set current(note:INote) {
      this.service.current = note;
   }
}

notesServiceLoader.$inject = ['NotesService'];
export function notesServiceLoader(service:NotesService) {
   return service.load();
}
