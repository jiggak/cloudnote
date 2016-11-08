import {NotesService} from './notes.service'; NotesService;
import Note from './note';

export class NotesController {
   list:Note[];
   current:Note;

   static $inject:string[] = ['NotesService'];
   constructor(private service:NotesService) {
      this.activate();
   }

   activate() {
      this.service.list().then(x => this.list = x);
   }
}
