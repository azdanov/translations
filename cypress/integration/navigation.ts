describe('navigation', () => {
  it('should have title, language and home', () => {
    cy.visit('/')

    cy.title().should('eq', 'Home | Translations')

    cy.contains('Language').should('exist')
    cy.contains('Language').click()
    cy.contains('English').should('exist')
    cy.contains('Eesti').should('exist')

    cy.contains('Home').should('exist')
  })

  it('should title in about', () => {
    cy.visit('/about')

    cy.title().should('eq', 'About | Translations')
  })
})
