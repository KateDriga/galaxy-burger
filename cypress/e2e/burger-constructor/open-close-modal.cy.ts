describe('Open and close ingredient details', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });
  it('should open modal', () => {
    cy.get('.ingredients_category:first > div > a:first').click();
    cy.get('[class^=modal_modal]');
  });
  it('should contain ingredient details', () => {
    cy.get('[class^=modal_modal_info]').should('contain', 'Детали ингредиента');
    cy.get('[class^=ingredient-details_ingredient_image]');
    cy.get('[class^=ingredient-details_ingredient_name]');
  });
  it('should close modal', () => {
    cy.get('[class^=modal_modal_close_icon]').click();
  });
});
