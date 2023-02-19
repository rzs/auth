import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { SecureResourceComponent } from './secure-resource/secure-resource.component';

const routes: Routes = [
  {path: 'secure-resource', component: SecureResourceComponent, canActivate: [AutoLoginPartialRoutesGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
