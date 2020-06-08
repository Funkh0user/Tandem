/// <reference types="cypress" />
import React from 'react'
import CreatePromo from './CreatePromo'
import { mount } from 'cypress-react-unit-test'


describe('CreatePromo Component', () => {
  it('loads the CreatePromo component', () => {
    mount(<CreatePromo />)
    // now use standard Cypress commands
    cy.get('[data-cy=closed]').should('be.visible')
    console.log(CreatePromo)
  })
  //it('posts data to the backend', () => {
  //
  // })
  //it('sets ISO datetime', () => {
  //
  // })
  //it('reveals new dom elements with user inputs', () => {
  //
  // })
})