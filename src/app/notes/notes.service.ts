import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { map, concatAll } from "rxjs/operators";

import { createClient, FileStat, WebDAVClient } from 'webdav';

export interface INote {
   filePath:string;
   title:string;
}

@Injectable({providedIn: 'root'})
export class NotesService {
   readonly client:WebDAVClient;

   constructor() {
      this.client = createClient('/webdav');
   }

   list() {
      return from(this.client.getDirectoryContents('/') as Promise<FileStat[]>)
         .pipe(map(list => list.sort(sortFile)))
         .pipe(concatAll(), map(toNote));

      function toNote(file:FileStat):INote {
         return {
            filePath: file.filename,
            title: file.basename.replace('.md', '')
         };
      }

      function sortFile(a:FileStat, b:FileStat) {
         if (a.basename > b.basename) {
            return 1;
         } else if (a.basename < b.basename) {
            return -1;
         } else {
            return 0;
         }
      }
   }
}
