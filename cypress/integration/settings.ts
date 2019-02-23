describe('settings', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show settings', () => {
    cy.contains('settings').should('exist')
    cy.contains('settings').click()
    cy.contains('clear data').should('exist')
  })

  it('should delete data', () => {
    cy.get('[placeholder="search …"]')
      .click()
      .type('car{enter}')
    cy.contains('close results').click()

    cy.contains('settings').click()
    cy.get('[data-testid=clear-action]').click()

    cy.contains('history').click()
    cy.contains('car').should('not.exist')
  })
})
