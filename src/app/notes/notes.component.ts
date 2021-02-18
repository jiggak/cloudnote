import { Component, OnInit } from "@angular/core";
import { toArray } from "rxjs/operators";

import { INote, NotesService } from "./notes.service";

@Component({
   templateUrl: './notes.html'
})
export class NotesComponent implements OnInit {
   constructor(
      private service:NotesService
   ) { }

   notes:INote[];

   ngOnInit() {
      this.service.list().pipe(toArray()).subscribe(notes => {
         this.notes = notes;
      });
   }
}