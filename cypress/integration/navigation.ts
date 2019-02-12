describe('navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have title, language, home and url', () => {
    cy.title().should('eq', 'Home | Translations')

    cy.contains('Language').should('exist')
    cy.contains('Language').click()
    cy.contains('English').should('exist')
    cy.contains('Eesti').should('exist')

    cy.contains('Home').should('exist')
    cy.contains('Home').click()
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/')
    })
  })
})
