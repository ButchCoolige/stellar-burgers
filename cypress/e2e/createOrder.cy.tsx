/// <reference types="cypress" />

import user from './user.json';
import orderSuccess from './successOrder.json';
import ingredients from './ingredients.json';

const SELECTORS = {
  orderButton: '[data-test="order-button"]',
  orderNumber: '[data-test="order-number"]',
  modalCloseButton: '[data-test="modal-close-button"]',
  orderModal: '[data-test="order-modal"]'
};

describe('тест оформления заказа', () => {
  beforeEach(() => {   
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: user.user
      }
    }).as('getUser');
 
    cy.intercept('GET', '**/ingredients', { body: ingredients }).as(
      'getIngredients'
    );

    cy.intercept('POST', '**/orders', (req) => {
      req.reply({
        statusCode: 200,
        body: orderSuccess
      });
    }).as('createOrder');
  
    cy.then(() => {
      window.localStorage.setItem('refreshToken', 'fake-refresh-token');
      cy.setCookie('accessToken', 'Bearer fake-access-token');
    });

    cy.visit('/');
  });

  it('проверка успешного оформления заказа', () => {  
    cy.get('.add-button-bun').first().click({ force: true });   
    cy.get('.add-button-main').first().click({ force: true });
    cy.get(SELECTORS.orderButton).first().click({ force: true }); 
    cy.get('#modals').find(SELECTORS.orderModal).should('exist');
    cy.get(SELECTORS.orderNumber).should('contain', orderSuccess.order.number); 
    cy.get('#modals').find(SELECTORS.modalCloseButton).click();  
    cy.get('#modals').find(SELECTORS.orderModal).should('not.exist');  
    cy.get('.constructor-element').should('not.exist');
  });
});
