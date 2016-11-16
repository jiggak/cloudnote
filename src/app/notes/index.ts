import { NotesController, notesServiceLoader } from './notes.controller';
import { NotesService } from './notes.service';
import app from '../app.module';

app.config(routeConfig);

app.controller('NotesController', NotesController);
app.service('NotesService', NotesService);

routeConfig.$inject = ['$routeProvider'];
function routeConfig($routeProvider) {
   $routeProvider.when('/:fileName?', {
      template: require('./notes.html'),
      controller: 'NotesController',
      controllerAs: 'notes',
      resolve: {
         loadedNotesService: notesServiceLoader
      }
   });
}
