import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { INote } from './notes.service';

@Component({
   templateUrl: './notes-list.html',
   styleUrls: ['./notes-list.scss']
})
export class NotesListComponent implements OnInit {
   constructor(
      private route:ActivatedRoute,
      private router:Router
   ) { }

   notes:INote[];
   activeFile:string;
   showNav = false;

   ngOnInit() {
      this.route.data.subscribe(data => {
         this.initNotes(data.notes);
      });
   }

   initNotes(notes:INote[]) {
      this.notes = notes;

      if (!this.route.firstChild) {
         this.router.navigate([notes[0].filePath]).then(() => {
            this.initNotes(notes);
         });
      } else {
         this.route.firstChild.paramMap.subscribe(x => {
            this.activeFile = '/' + x.get('file');
         });
      }
   }

   onSelect() {
      this.showNav = false;
   }
}