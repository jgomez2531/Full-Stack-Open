describe('PokemonPage', function () {
  it('pokemon page can be opened and has content', function () {
    cy.visit('http://localhost:5000')
    cy.contains('ivysaur').click()
    cy.contains('chlorophyll')
  })
})
