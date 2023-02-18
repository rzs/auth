import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <main><div class="header"><h1>OAuth2-OIDC Demo</h1></div>
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
export class AppComponent {
  title = 'client';
}
