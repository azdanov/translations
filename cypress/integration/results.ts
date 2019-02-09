describe('results', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show results on enter', () => {
    cy.getByPlaceholderText('Search for a word …')
      .click()
      .type('car{enter}')

    cy.getByText('Results: 61').should('exist')
    cy.getByText('auto').should('exist')
  })

  it('should show results on action button click', () => {
    cy.getByPlaceholderText('Search for a word …')
      .click()
      .type('car')

    cy.getByTestId('search-action').click()

    cy.getByText('Results: 61').should('exist')
    cy.getByText('auto').should('exist')
  })

  it('should show loading', () => {
    cy.getByPlaceholderText('Search for a word …')
      .click()
      .type('car')

    cy.getByTestId('search-action').click()

    cy.getByText('Loading …').should('exist')
  })
})
