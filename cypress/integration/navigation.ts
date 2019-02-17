/* eslint-disable cypress/no-unnecessary-waiting */
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

  it('should have proper back and forward', () => {
    cy.visit('/')

    cy.get('[placeholder="search …"]')
      .click()
      .type('car{enter}')
    cy.url().should('include', 'en/et/car')

    cy.get('[placeholder="search …"]')
      .click()
      .type('{selectall}bus{enter}')
    cy.url().should('include', 'en/et/bus')

    cy.get('[placeholder="search …"]')
      .click()
      .type('{selectall}car{enter}')
    cy.url().should('include', 'en/et/car')

    cy.contains('results').should('exist')
    cy.contains('sõiduauto').should('exist')

    cy.visit('/about')
    cy.go('back')
    cy.go('back')

    cy.contains('results').should('exist')
    cy.contains('autobuss').should('exist')

    cy.go('forward')
    cy.go('forward')
    cy.title().should('match', /^about/)
  })

  it('should have proper url when order changed', () => {
    cy.visit('/')
    cy.url().should('include', 'en/et')
    cy.get('[data-testid=order-action]').click()
    cy.url().should('include', 'et/en')
  })
})
