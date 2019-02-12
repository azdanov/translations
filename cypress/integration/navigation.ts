describe('navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have home with proper url', () => {
    cy.contains('Home').click()
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/')
    })
    cy.title().should('eq', 'Home | Translations')
  })
})
