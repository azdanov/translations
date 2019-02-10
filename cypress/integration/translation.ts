describe('translation', () => {
  before(() => {
    cy.visit('/')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500) // Issues with i18next, doesn't change fast enough
    cy.contains('Eesti').click({ force: true })
  })

  it('should have home', () => {
    cy.contains('Avaleht').should('exist')
  })

  it('should have hero text', () => {
    cy.contains('Inglise - Eesti').should('exist')
    cy.contains('Sõnastik').should('exist')
  })

  it('should find search bar', () => {
    cy.get('[placeholder="Otsi sõna …"]').should('exist')
  })

  it('should show results', () => {
    cy.get('[placeholder="Otsi sõna …"]')
      .click()
      .type('car{enter}')

    cy.contains('Laadimine …').should('exist')
    cy.contains('Tulemused: 61').should('exist')
    cy.contains('auto').should('exist')
  })
})
