/// <reference types="cypress" />

import ingredients from './ingredients.json';

describe('проверяем, что при клике в конструктор добавляется булка и начинка', () => {
  beforeEach(() => {    
    cy.intercept('GET', '**/ingredients', { body: ingredients }).as(
      'getIngredients'
    );   
    cy.visit('/');   
    cy.wait('@getIngredients');
  });

  it('добавление булки в конструктор', () => {    
    const bun = ingredients.data.find((item) => item.type === 'bun');   
    cy.get('.add-button-bun').first().click({ force: true });    
    cy.get('.constructor-element_pos_top').should('contain', bun!.name);   
    cy.get('.constructor-element_pos_bottom').should('contain', bun!.name);
  });

  it('добавление начинки в конструктор', () => {   
    const mainIng = ingredients.data.find((item) => item.type === 'main');    
    cy.get('.add-button-main').first().click({ force: true });    
    cy.get('.constructor-element__row').should('contain', mainIng!.name);
  });
});
