import { bootstrap } from 'angular';
import app from './app/app.module';

import './main.css';

bootstrap(document.body, [app.name], { strictDi: true });
