import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { toArray } from "rxjs/operators";

import { INote, NotesService } from "./notes.service";

@Component({
   templateUrl: './notes.html',
   styleUrls: ['./notes.scss']
})
export class NotesComponent implements OnInit {
   constructor(
      private service:NotesService,
      private route:ActivatedRoute
   ) { }

   notes:INote[];
   activeFile:string;

   get markdownUrl() {
      return `/webdav${this.activeFile}`;
   }

   ngOnInit() {
      this.service.list().pipe(toArray()).subscribe(notes => {
         this.notes = notes;
      });

      this.route.paramMap.subscribe(x => {
         this.activeFile = '/' + x.get('file');
      });
   }
}