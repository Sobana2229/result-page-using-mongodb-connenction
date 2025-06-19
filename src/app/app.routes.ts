import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResultComponent } from './result/result.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'result', component: ResultComponent }
];
