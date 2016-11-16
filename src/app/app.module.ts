import { module } from 'angular';

// create main app module
const app = module('notesApp', ['ngCookies', 'ngRoute']);
export default app;

// "sub-modules"
import './notes';
import './markdown.directive';
