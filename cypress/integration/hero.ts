describe('hero', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have hero text', () => {
    cy.queryByText('English - Estonian').should('exist')
    cy.queryByText('Dictionary').should('exist')
  })
})
