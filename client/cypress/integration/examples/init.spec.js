
describe('cypress', () => {
    it('it works', () => {
        expect(true).to.equal(true)
    })

    it('visits the app', () => {
        cy.visit('/')
    })
})