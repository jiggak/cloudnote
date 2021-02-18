import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { map, mergeMap, concatAll } from "rxjs/operators";

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
         .pipe(concatAll(), map(toNote));

      function toNote(file:FileStat):INote {
         return {
            filePath: file.filename,
            title: file.basename.replace('.md', '')
         };
      }
   }
}
