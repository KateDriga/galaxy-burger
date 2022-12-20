describe('Add and remove ingredient functionality', () => {
  before(() => {
    cy.visit('/');
  });
  it('should drag and drop ingredient', () => {
    const ingredientSelector = '.ingredients_category:last > div > a:first';
    cy.get(ingredientSelector).trigger('dragstart');
    cy.get('[class^=burger-constructor_burger_constructor]')
      .trigger('dragenter')
      .trigger('drop')
      .trigger('dragend');
    // check amount
    cy.get(`${ingredientSelector} > div > .counter__num`)
      .invoke('text')
      .should('eq', '1');
    // check price
    let ingredientPrice: number;
    cy.get(
      `${ingredientSelector} > [class^=burger-ingredient_burger_price] > span`
    ).should($price => {
      ingredientPrice = +$price.text();
    });
    let totalPrice;
    cy.get('[class^=burger-constructor_order_details_price_] > span').should(
      $total => {
        totalPrice = +$total.text();
        expect(ingredientPrice).to.eq(totalPrice);
      }
    );
  });
  it('should remove ingredient', () => {
    cy.get('[class^=burger-constructor_ingredients_middle]').as(
      'middleIngredients'
    );
    cy.get('@middleIngredients')
      .find(
        '[class^=constructor-ingredient_constructor_element_row] .constructor-element__action svg'
      )
      .click();
    cy.get('@middleIngredients')
      .find('[class^=constructor-ingredient_constructor_element_row]')
      .should('not.exist');
  });
});
