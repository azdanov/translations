describe('search', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should find search bar', () => {
    cy.get('[placeholder="Search for a word …"]').should('exist')
  })

  it('should find action button', () => {
    cy.get('[data-testid=search-action]').should('exist')
  })
})
