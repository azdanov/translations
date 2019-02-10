describe('footer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should exist with current year', () => {
    cy.contains(`${new Date().getFullYear()}`).should('exist')
  })
})
