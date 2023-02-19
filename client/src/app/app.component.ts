import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  template: `
  <main><div class="header" [attr.data-cy]="'landing-page-is-here'"><h1>OAuth2-OIDC Demo</h1></div>
<button routerLink="/secure-resource">Secured resource</button>
<router-outlet></router-outlet>
</main>`,
  styles:  [`

  .header {
    height: 10rem;
    background-color: cornflowerblue;
  }
  h1 {
    color: blue;
  }
  `],
})
export class AppComponent implements OnInit {
  title = 'client';
  
  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      console.log('Is authenticated:')
      console.log(isAuthenticated)

      console.log('User data:')
      console.log(userData)

      console.log('AccessToken:')
      console.log(accessToken)

      console.log('IdToken:')
      console.log(idToken)
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }
}
