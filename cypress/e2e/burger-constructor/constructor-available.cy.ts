describe('Burger constructor is available', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });
  it('should open ingredients-constructor page by default', () => {
    cy.contains('Соберите бургер');
  });
  it('should contain different types of ingredients', () => {
    cy.contains('Булки');
    cy.contains('Соусы');
    cy.contains('Начинки');
  });
  it('should have 0 total price', () => {
    cy.get('[class^=burger-constructor_order_details_price_]').contains(0);
  });
  it('should have disabled create order button', () => {
    cy.get('.button.button_type_primary').should('be.disabled');
  });
});
