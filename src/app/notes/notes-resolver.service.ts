import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { INote, NotesService } from './notes.service';

@Injectable({ providedIn: 'root' })
export class NotesResolverService implements Resolve<INote[]> {
   constructor(
      private service:NotesService
   ) { }

   resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<INote[]> {
      return this.service.list();
   }
}