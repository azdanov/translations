describe('navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have navigation buttons', () => {
    cy.queryByText('Home').should('exist')
    cy.queryByText('English').should('exist')
    cy.queryByText('Eesti').should('exist')
  })

  it('should have home with proper url', () => {
    cy.queryByText('Home').click()
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/')
    })
  })

  it('should change language to estonian and back to english', () => {
    cy.getByText('Eesti').click()
    cy.queryByText('Avaleht').should('exist')
    cy.getByText('English').click()
    cy.queryByText('Home').should('exist')
  })
})
