import { useLocalJWTToken } from "./beforeSetup";

describe('Auth flow', () => {
    before(useLocalJWTToken());

    it('Create keys', () => {
        cy.visit('localhost:4200/');
        cy.get('button').should('exist').click();
        cy.get('[data-cy="secure-resource-is-here"]').should('exist');
    });
})