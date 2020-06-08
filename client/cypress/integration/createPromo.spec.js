describe('The promo widget should behave correctly', () => {
    it('visits the route', () => {
        cy.visit('/create')  
    })
    it('loads a closed widget', () => {
        cy.get('[data-cy=closed]').should('be.visible')
    })
    it('opens when the button is clicked', () => {
        cy.get('[data-cy=toggle-open]').click()
        cy.get('[data-cy=open]').should('be.visible')
    })
    it('is focused on the first input after being clicked', () => {
        cy.focused().should('have.attr', 'data-cy')
    })
})