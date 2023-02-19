describe('Landing page', () => {


    it('Test landing page exists', () => {
        cy.visit('localhost:4200/');
        cy.get('[data-cy="landing-page-is-here"]').should('exist');
    });
})