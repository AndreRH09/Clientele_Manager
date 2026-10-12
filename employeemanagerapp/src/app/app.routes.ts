import { Routes } from '@angular/router';
import { EmployeeList } from './employees/employee-list';

export const routes: Routes = [
  { path: '', component: EmployeeList },
  { path: '**', redirectTo: '' }
];
