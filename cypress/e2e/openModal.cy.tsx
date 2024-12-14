/// <reference types="cypress" />

import ingredients from './ingredients.json';

const SELECTORS = {
  ingredientLink: '[data-test="ingredient-link"]',
  ingredientModal: '[data-test="ingredient-modal"]',
  modalCloseButton: '[data-test="modal-close-button"]',
  modalOverlay: '[data-test="modal-overlay"]'
};

describe('тест модального окна с ингредиентом', () => {
  beforeEach(() => {    
    cy.intercept('GET', '**/ingredients', { body: ingredients }).as(
      'getIngredients'
    );    
    cy.visit('/');   
    cy.wait('@getIngredients');
  });

  it('открытие модального окна при клике на ингредиент', () => {    
    cy.get(SELECTORS.ingredientLink).first().click();
    cy.get('#modals').find(SELECTORS.ingredientModal).should('exist');
  });

  it('закрытие модального окна нажатием на кнопку закрытия', () => {    
    cy.get(SELECTORS.ingredientLink).first().click();   
    cy.get('#modals').find(SELECTORS.ingredientModal).should('exist');    
    cy.get('#modals').find(SELECTORS.modalCloseButton).click();
    cy.get('#modals').find(SELECTORS.ingredientModal).should('not.exist');
  });

  it('закрытие модального окна нажатием Esc', () => {   
    cy.get(SELECTORS.ingredientLink).first().click();   
    cy.get('#modals').find(SELECTORS.ingredientModal).should('exist');   
    cy.get('body').type('{esc}');   
    cy.get('#modals').find(SELECTORS.ingredientModal).should('not.exist');
  });

  it('закрытие модального окна кликом на оверлей', () => {    
    cy.get(SELECTORS.ingredientLink).first().click();    
    cy.get('#modals').find(SELECTORS.ingredientModal).should('exist');   
    cy.get('#modals')
      .find(SELECTORS.modalOverlay)      
      .click({ force: true });   
    cy.get('#modals').find(SELECTORS.ingredientModal).should('not.exist');
  });
});
