import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://127.0.0.1:9000/',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: 'portal',
            scope: 'openid', // 'openid profile ' + your scopes
            responseType: 'code',
            autoUserInfo: false,
            silentRenew: false,
            renewTimeBeforeTokenExpiresInSeconds: 10,
            logLevel: LogLevel.Debug,
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
