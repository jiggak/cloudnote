import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
   template: '<markdown [src]="markdownUrl"></markdown>'
})
export class NoteContentComponent {
   markdownUrl:string;

   constructor(route:ActivatedRoute) {
      route.paramMap.subscribe(x => {
         this.markdownUrl = `/webdav/${x.get('file')}`;
      });
   }
}