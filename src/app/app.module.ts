import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { NotesComponent } from "./notes/notes.component";

@NgModule({
   bootstrap: [AppComponent],
   imports: [
      BrowserModule,
      CommonModule,
      AppRoutingModule
   ],
   declarations: [
      AppComponent,
      NotesComponent
   ],
})
export class AppModule { }
