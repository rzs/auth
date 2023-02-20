import {JWK} from 'jose';
import { Keys, JWTSetup } from './jwtSetup';


let keys: Keys;
let jwk: JWK;
let nonce: string | number;

const defaultTokenMock = () => {
    cy.intercept('POST', 'https://127.0.0.1:9000/oauth2/token', async (req) => {
        return req.reply({
            access_token: await JWTSetup.createAndSignJwt(keys.privateK, {nonce: nonce}),
            scope: 'openid',
            id_token: await JWTSetup.createAndSignJwt(keys.privateK, { nonce: nonce, cpr:  '010101-1010'}),
            token_type: 'Bearer',
            expires_in: 300,
        });
    }).as('createJwt');
};

export function useLocalJWTToken(tokenMock = defaultTokenMock): Mocha.HookFunction {
    // GENERATE KEYS AND JWKS
    return () => {
        cy.wrap(null)
        .then(async () => (keys = await JWTSetup.generateKeys())).as('generateKeys');
        cy.wrap(null)
        .then(async () => (jwk = await JWTSetup.generateJwks(keys.publicK, 'nodeserver-jwt'))).as('generateJWKS');

        cy.intercept('GET', 'https://127.0.0.1:9000/.well-known/openid-configuration', (req) => {
            return req.reply({
                issuer: 'https://127.0.0.1:9000',
                authorization_endpoint: 'https://127.0.0.1:9000/oauth2/authorize',
                token_endpoint: 'https://127.0.0.1:9000/oauth2/token',
                token_endpoint_auth_methods_supported: [
                    'client_secret_basic',
                    'client_secret_post',
                    'client_secret_jwt',
                    'private_key_jwt',
                ],
                jwks_uri: 'https://127.0.0.1:9000/oauth2/jwks',
                userinfo_endpoint: 'https://127.0.0.1:9000/userinfo',
                response_types_supported: ['code'],
                grant_types_supported: ['authorization_code', 'client_credentials', '(refresh)token'],
                revocation_endpoint: 'https://127.0.0.1:9000/oauth2/revoke',
                revocation_endpoint_auth_methods_supported: [
                    'client_secret_basic',
                    'client_secret_post',
                    'client_secret_jwt',
                    'private_key_jwt',
                ],
                introspection_endpoint: 'https://127.0.0.1:9000/oauth/introspect',
                introspection_endpoint_auth_methods_supported: [
                    'client_secret_basic',
                    'client_secret_post',
                    'client_secret_jwt',
                    'private_key_jwt',    
                ],
                subject_types_supported: ['public'],
                id_token_signing_alg_values_supported: ['RS256'],
                scopes_supported: ['openid'],
            });
        }).as('openidConfig');

    cy.intercept('GET', 'https://127.0.0.1:9000/oauth2/authorize?client_id=portal*', (req) => {
        const state = req.query['state'];
        nonce = req.query['nonce'];
        Cypress.log({name: 'Request nonce', message: req.query['nonce']});
        return req.redirect('http://localhost:4200/?code=123456&state=' + state, 302);
    }).as('nonce');

    tokenMock();

    cy.intercept('GET', 'https://127.0.0.1:9000/oauth2/jwks', (req) => {
        return req.reply({keys: [jwk],});
    }).as('jwks');
}
}

