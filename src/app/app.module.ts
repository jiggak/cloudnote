import { module } from 'angular';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

const app = module('notesApp', ['ngCookies']);

app.controller('NotesController', NotesController);
app.service('NotesService', NotesService);

export default app;
