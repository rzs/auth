import {useLocalJWTToken} from './beforeSetup'

const tokenMock = () => {
    cy.intercept('POST', 'https://127.0.0.1:9000/oauth2/token', (req) => {
        req.continue((res) => {
            // Token has header, payload and signature parts separated by .
            let token_parts = res.body.id_token.split('.');
            // id token in JSON format
            let id_token = atob(token_parts[1]);
            Cypress.log({name: 'ID Token', message: id_token});
            // add claim
            id_token = id_token.slice(0, -1) + ', "Jens":"Lyn"}';
            Cypress.log({name: 'ID token altered', message:id_token});
            // send altered token in body
            res.body.id_token = token_parts[0] + '.' + btoa(id_token) + '.' + token_parts[2];
            res.send();
        });
    }).as('changeReturnedToken');
};

describe('Login flow', () => {
    before(useLocalJWTToken(tokenMock));

    it('Authenticate', async () => {
        cy.visit('localhost:4200/');
        cy.get('button').should('exist').click();
        cy.get('[data-cy="secure-resource-is-here"]').should('exist');
    })
})