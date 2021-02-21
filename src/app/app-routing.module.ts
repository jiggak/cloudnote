import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoteContentComponent } from './notes/note-content.component';
import { NotesComponent } from './notes/notes.component';
import { NotesListComponent } from './notes/notes-list.component';
import { NotesResolverService } from './notes/notes-resolver.service';

const routes:Routes = [
   {
      path: '',
      component: NotesComponent,
      children: [
         {
            path: '',
            component: NotesListComponent,
            resolve: { notes: NotesResolverService },
            children: [
               {
                  path: ':file',
                  component: NoteContentComponent
               }
            ]
         }
      ]
   }
]

@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ]
})
export class AppRoutingModule { }
