import { bootstrap } from 'angular';
import app from './app/app.module';

bootstrap(document.body, [app.name], { strictDi: true });
