describe('lambda', () => {
  it('returns stringified json for english definition', () => {
    cy.request('.netlify/functions/definition/en/car')
      .its('body')
      .then(body => {
        expect(JSON.parse(body)).to.have.length(24)
      })
  })

  it('returns stringified json for estonian definition', () => {
    cy.request('.netlify/functions/definition/et/auto')
      .its('body')
      .then(body => {
        expect(JSON.parse(body)).to.have.length(2)
      })
  })

  it('returns stringified json for english translation', () => {
    cy.request('.netlify/functions/translate/en/car')
      .its('body')
      .then(body => {
        expect(JSON.parse(body)).to.have.length(81)
      })
  })

  it('returns stringified json for estonian translation', () => {
    cy.request('.netlify/functions/translate/et/auto')
      .its('body')
      .then(body => {
        expect(JSON.parse(body)).to.have.length(39)
      })
  })

  it('returns statistics', () => {
    cy.request('.netlify/functions/statistics')
      .its('body')
      .then(body => {
        expect(JSON.parse(body).phrases).to.eq('131,910')
      })
  })

  it('returns word of the day', () => {
    cy.request('.netlify/functions/day')
      .its('body')
      .then(body => {
        expect(JSON.parse(body)).to.have.all.keys(
          'contentProvider',
          'definitions',
          'examples',
          'id',
          'note',
          'publishDate',
          'word',
        )
      })
  })
})
