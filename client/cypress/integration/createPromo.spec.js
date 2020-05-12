describe('The promo widget should behave correctly', () => {
    it('it visits the route', () => {
        cy.visit('/create')  
    })
    it('loads a closed widget', () => {
        cy.get('.create-promo').should('have.class', 'closed')

    })
    it('the widget opens when the button is clicked', () => {
        cy.get('button').click()
        cy.get('.create-promo').should('have.class', 'open')

    })

})