import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { NotesComponent } from "./notes/notes.component";
import { SearchPipe } from "./notes/search.pipe";

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
      SearchPipe
   ],
})
export class AppModule { }
