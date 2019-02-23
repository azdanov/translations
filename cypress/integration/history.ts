describe('history', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show history', () => {
    cy.contains('history').should('exist')
  })

  it('should show saved history', () => {
    cy.get('[placeholder="search …"]')
      .click()
      .type('car{enter}')

    cy.get('[data-testid=order-action]').click()

    cy.get('[placeholder="search …"]')
      .click()
      .type('auto{enter}')

    cy.contains('close results').click()
    cy.contains('history').click()

    cy.contains('english - estonian').should('exist')
    cy.contains('car').should('exist')
    cy.contains('estonian - english').should('exist')
    cy.contains('auto').should('exist')
  })
})
