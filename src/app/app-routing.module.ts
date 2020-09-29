  
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppAuthGuard } from './app.authguard';
import { ApisComponent } from './apis/apis.component';
import { TestComponent } from './test/test.component';
import { ListApisComponent } from './listapis/listapis.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/apis',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'apis',
    component: ApisComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'apis/list',
    component: ListApisComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'test',
    component: TestComponent,
    canActivate: [AppAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule {}
