describe('hero', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have hero text', () => {
    cy.contains('English - Estonian').should('exist')
    cy.contains('Dictionary').should('exist')
  })
})
