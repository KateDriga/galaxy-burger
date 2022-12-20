import { getCookie } from '../../../src/utils/cookie';

describe('Create new order', () => {
  let tokenRefreshed: boolean = false;
  let createOrderBtnClicked: boolean = false;

  const interceptTokenRefresh = () => {
    if (tokenRefreshed) {
      return;
    }
    cy.intercept({ method: 'POST', url: 'token' }, []).as('getToken');
    if (getCookie('refreshToken')) {
      cy.wait('@getToken').then($response => {
        if ($response.response?.statusCode === 200) {
          tokenRefreshed = true;
        }
      });
    }
  };
  before(() => {
    cy.visit('/');
    interceptTokenRefresh();
  });
  it('should add several ingredients', () => {
    cy.get('.ingredients_category').each($category => {
      cy.wrap($category).find('div > a:first').trigger('dragstart');
      cy.get('[class^=burger-constructor_burger_constructor]')
        .trigger('dragenter')
        .trigger('drop')
        .trigger('dragend');
    });
  });
  it('should redirect to login on create order button click', () => {
    if (!tokenRefreshed) {
      cy.get('.button.button_type_primary').click();
      createOrderBtnClicked = true;
      interceptTokenRefresh();
      if (!tokenRefreshed) {
        createOrderBtnClicked = false;
        cy.contains('Вход');
        cy.contains('Войти');
      }
    }
  });
  it('should log in', () => {
    if (!tokenRefreshed) {
      cy.get('.input__container .input_type_email input').type(
        'e2etest@test-email.com'
      );
      cy.get('.input__container .input_type_password input').type('secrettest');
      cy.contains('Войти').click();
    }
  });
  it('should create new order and open modal', () => {
    if (!createOrderBtnClicked) {
      cy.contains('Оформить заказ').click();
    }
    cy.get('[class^=modal_modal_info]', { timeout: 30000 }).should(
      'contain',
      'идентификатор заказа'
    );
    cy.get('[class^=order-details_order]');
  });
  it('should close order details modal', () => {
    cy.get('[class^=modal_modal_close_icon]').click();
  });
});
