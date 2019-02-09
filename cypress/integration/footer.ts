describe('footer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should exist with current year', () => {
    cy.queryByText(`${new Date().getFullYear()}`).should('exist')
  })
})
