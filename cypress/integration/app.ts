describe('translations', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('navigation', () => {
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

  describe('hero', () => {
    it('should have hero text', () => {
      cy.queryByText('English - Estonian').should('exist')
      cy.queryByText('Dictionary').should('exist')
    })

    it('should have translated hero text', () => {
      cy.getByText('Eesti').click()
      cy.queryByText('Inglise - Eesti').should('exist')
      cy.queryByText('Sõnastik').should('exist')
    })
  })

  describe('main', () => {
    describe('search', () => {
      it('should find search bar', () => {
        cy.getByPlaceholderText('Search for a word …').should('exist')
      })

      it('should find translated search bar', () => {
        cy.getByText('Eesti').click()
        cy.getByPlaceholderText('Otsi sõna …').should('exist')
      })

      it('should find action button', () => {
        cy.getByTestId('search-action').should('exist')
      })
    })

    describe('results', () => {
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

      it('should show translated loading', () => {
        cy.getByText('Eesti').click()
        cy.getByPlaceholderText('Otsi sõna …')
          .click()
          .type('car')

        cy.getByTestId('search-action').click()

        cy.getByText('Laadimine …').should('exist')
      })

      it('should show translated results area', () => {
        cy.getByText('Eesti').click()
        cy.getByPlaceholderText('Otsi sõna …')
          .click()
          .type('car')

        cy.getByTestId('search-action').click()

        cy.getByText('Tulemused: 61').should('exist')
        cy.getByText('auto').should('exist')
      })
    })
  })

  describe('footer', () => {
    it('should exist with current year', () => {
      cy.queryByText(`${new Date().getFullYear()}`).should('exist')
    })
  })
})
