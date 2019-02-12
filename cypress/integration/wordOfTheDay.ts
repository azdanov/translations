describe('word of the day', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show word of the day', () => {
    cy.contains('Word of the day').should('exist')
  })

  it('should show definition', () => {
    cy.contains('Definition:').should('exist')
  })
})
