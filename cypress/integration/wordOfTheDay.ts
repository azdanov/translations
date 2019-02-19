describe('word of the day', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('language').click()
    cy.contains('English').click()
  })

  it('should show word of the day', () => {
    cy.contains('Daily Word').should('exist')
  })

  it('should show definition', () => {
    cy.contains('Definition:').should('exist')
  })
})
