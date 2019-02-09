describe('translation', () => {
  before(() => {
    cy.visit('/')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100) // Issues with i18next, doesn't change fast enough
    cy.getByText('Eesti').click({ force: true })
  })

  it('should have home', () => {
    cy.queryByText('Avaleht').should('exist')
  })

  it('should have hero text', () => {
    cy.queryByText('Inglise - Eesti').should('exist')
    cy.queryByText('Sõnastik').should('exist')
  })

  it('should find search bar', () => {
    cy.getByPlaceholderText('Otsi sõna …').should('exist')
  })

  it('should show results', () => {
    cy.getByPlaceholderText('Otsi sõna …')
      .click()
      .type('car{enter}')

    cy.getByText('Laadimine …').should('exist')
    cy.getByText('Tulemused: 61').should('exist')
    cy.getByText('auto').should('exist')
  })
})
