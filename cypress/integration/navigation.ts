describe('navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have navigation buttons', () => {
    cy.contains('Home').should('exist')
    cy.contains('English').should('exist')
    cy.contains('Eesti').should('exist')
  })

  it('should have home with proper url', () => {
    cy.contains('Home').click()
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/')
    })
  })

  it('should change language to estonian and back to english', () => {
    cy.contains('Eesti').click()
    cy.contains('Avaleht').should('exist')
    cy.contains('English').click()
    cy.contains('Home').should('exist')
  })
})
