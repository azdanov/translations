describe('results', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('language').click()
    cy.contains('English').click()
  })

  it('should show results on enter', () => {
    cy.get('[placeholder="Search for a word …"]')
      .click()
      .type('car{enter}')

    cy.contains('Results').should('exist')
    cy.contains('auto').should('exist')
  })

  it('should show results on action button click', () => {
    cy.get('[placeholder="Search for a word …"]')
      .click()
      .type('car')

    cy.get('[data-testid=search-action]').click()

    cy.contains('Results').should('exist')
    cy.contains('auto').should('exist')
  })

  it('should show loading', () => {
    cy.get('[placeholder="Search for a word …"]')
      .click()
      .type('car')

    cy.get('[data-testid=search-action]').click()

    cy.contains('Loading …').should('exist')
  })
})
