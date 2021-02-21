import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INote } from './notes.service';

@Component({
   templateUrl: './notes-list.html',
   styleUrls: ['./notes-list.scss']
})
export class NotesListComponent implements OnInit {
   constructor(
      private route:ActivatedRoute
   ) { }

   notes:INote[];
   activeFile:string;
   showNav = false;

   ngOnInit() {
      this.route.data.subscribe(data => {
         this.notes = data.notes;
      });

      this.route.firstChild.paramMap.subscribe(x => {
         this.activeFile = '/' + x.get('file');
      });
   }

   onSelect() {
      this.showNav = false;
   }
}