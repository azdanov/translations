describe('search', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should find search bar', () => {
    cy.getByPlaceholderText('Search for a word …').should('exist')
  })

  it('should find action button', () => {
    cy.getByTestId('search-action').should('exist')
  })
})
