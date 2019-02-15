describe('navigation', () => {
  it('should have title, language and home', () => {
    cy.visit('/')
    cy.contains('language').click()
    cy.contains('English').click()
    cy.contains('Language').click()
    cy.contains('Eesti').should('exist')

    cy.title().should('eq', 'Home | Translations')

    cy.contains('Home').should('exist')
    cy.contains('About').should('exist')
  })

  it('should title in about', () => {
    cy.visit('/about')
    cy.contains('language').click()
    cy.contains('English').click()

    cy.title().should('eq', 'About | Translations')
  })
})
