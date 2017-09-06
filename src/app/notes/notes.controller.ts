import {NotesService, INote} from './notes.service'; NotesService;

export class NotesController {
   static $inject:string[] = ['$routeParams', '$location', 'loadedNotesService'];

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
         $location.path(service.list[0].fileName);
      }
   }

   search(search:string) {
      this.service.search(search);
   }

   get list():INote[] {
      return this.service.list;
   }

   get current():INote {
      return this.service.current;
   }
}

notesServiceLoader.$inject = ['NotesService'];
export function notesServiceLoader(service:NotesService) {
   return service.load();
}
