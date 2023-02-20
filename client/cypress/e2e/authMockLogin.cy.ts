import { useLocalJWTToken } from "./beforeSetup";

describe('Auth flow', () => {
    before(useLocalJWTToken());

    it('Create keys', () => {
        cy.visit('localhost:4200/secure-resource');
        //cy.get('a[href*="/secure-resource"]').click();
        //cy.wait('@nonce').its('status').should('eq', 200)
        cy.wait(10000).get('button').should('exist').click();
        cy.get('[data-cy="secure-resource-is-here"]').should('exist');
    });
})