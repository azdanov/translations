/* eslint-disable cypress/no-unnecessary-waiting */
describe('translation', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(300) // Issues with i18next, doesn't change fast enough
    cy.contains('language').click()
    cy.contains('Eesti').click()
  })

  it('should have elements translated', () => {
    cy.title().should('eq', 'Avaleht | Tõlked')
    cy.contains('Avaleht').should('exist')
    cy.contains('Keel').should('exist')
    cy.contains('Inglise - Eesti').should('exist')
    cy.contains('Sõnastik').should('exist')
    cy.get('[placeholder="Otsi sõna …"]').should('exist')
    cy.contains('Päeva sõna').should('exist')
    cy.contains('Määratlus:').should('exist')

    cy.visit('/about')
    cy.contains('language').click()
    cy.contains('Eesti').click()
    cy.title().should('eq', 'Sellest | Tõlked')
  })

  it('should show results', () => {
    cy.get('[placeholder="Otsi sõna …"]')
      .click()
      .type('car{enter}')

    cy.contains('Laadimine …').should('exist')
    cy.contains('Tulemused').should('exist')
    cy.contains('auto').should('exist')
  })
})
