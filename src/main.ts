// angular polyfills
import 'zone.js/dist/zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import 'bootstrap/scss/bootstrap.scss';

platformBrowserDynamic().bootstrapModule(AppModule);
