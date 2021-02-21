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

   private _notes:INote[];
   notes:INote[];

   activeFile:string;
   showNav = false;

   ngOnInit() {
      this.route.data.subscribe(data => {
         this.initNotes(data.notes);
      });
   }

   private initNotes(notes:INote[]) {
      this._notes = this.notes = notes;

      // navigated to route without file param
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

   onSearch(search:string) {
      if (search && search != '') {
         search = search.toLowerCase();
         this.notes = this._notes.filter(note => note.title.toLowerCase().indexOf(search) >= 0);
         if (this.notes.length > 0) {
            this.router.navigate([this.notes[0].filePath]);
         }
      } else {
         this.notes = this._notes;
      }
   }

   onSelect() {
      this.showNav = false;
   }
}