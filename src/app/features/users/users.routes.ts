import { Routes } from '@angular/router';
import { UsersPage } from './pages/users.page';
import { UserDetailPage } from './pages/user-detail.page';

export const USERS_ROUTES: Routes = [
  { path: '', component: UsersPage },
  { path: ':id', component: UserDetailPage }
];
