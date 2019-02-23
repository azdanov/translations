describe('settings', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show definition and close', () => {
    cy.get('[placeholder="search …"]')
      .click()
      .type('car{enter}')
    cy.contains('auto').click()

    cy.contains('“Auto” definitions').should('exist')
    cy.contains('close').click({ force: true })
  })
})
