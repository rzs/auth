import { useLocalJWTToken } from "./beforeSetup";

describe('Auth flow', () => {
    before(useLocalJWTToken());

    it('Create keys', () => {
        cy.visit('/');

        cy.get('a[href*="/some/url"]').should('exist').click();
        cy.get('[data-cy="some-attribute"]').should('exist');
    });
})