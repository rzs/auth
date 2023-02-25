import { useLocalJWTToken } from "./beforeSetup";

describe('Auth flow', () => {
    before(useLocalJWTToken());

    it('Create keys', () => {
        cy.visit('localhost:4200/secure-resource');
        cy.get('[data-cy="secure-resource-is-here"]',{timeout: 10000});
        cy.get('[data-cy="secure-resource-is-here"]').should('exist');
    });
})