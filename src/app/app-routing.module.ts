import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'owners',
    loadChildren: () => import('./owners/owners.module').then( m => m.OwnersPageModule)
  },
  {
    path: 'user-in-queue',
    loadChildren: () => import('./user-in-queue/user-in-queue.module').then( m => m.UserInQueuePageModule)
  },
  {
    path: 'service-queue',
    loadChildren: () => import('./service-queue/service-queue.module').then( m => m.ServiceQueuePageModule)
  },
  {
    path: 'queue-operations',
    loadChildren: () => import('./queue-operations/queue-operations.module').then( m => m.QueueOperationsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
