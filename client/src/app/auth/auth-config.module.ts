import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://127.0.0.1:9000/',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: '1234',
            scope: 'openid', // 'openid profile ' + your scopes
            responseType: 'code',
            silentRenew: false,
            renewTimeBeforeTokenExpiresInSeconds: 10,
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
