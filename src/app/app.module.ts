import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteContentComponent } from './notes/note-content.component';
import { NotesListComponent } from './notes/notes-list.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
   bootstrap: [AppComponent],
   imports: [
      BrowserModule,
      CommonModule,
      AppRoutingModule,
      HttpClientModule,
      MarkdownModule.forRoot({
         loader: HttpClient
      })
   ],
   declarations: [
      AppComponent,
      NotesComponent,
      NotesListComponent,
      NoteContentComponent
   ],
})
export class AppModule { }
