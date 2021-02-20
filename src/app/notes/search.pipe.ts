import { Pipe, PipeTransform } from "@angular/core";
import { INote } from "./notes.service";

@Pipe({
   name: 'search'
})
export class SearchPipe implements PipeTransform {
   transform(notes:INote[], search:string) {
      if (search) {
         search = search.toLowerCase();
         notes = notes.filter(note => note.title.toLowerCase().indexOf(search) >= 0);
      }

      return notes;
   }
}