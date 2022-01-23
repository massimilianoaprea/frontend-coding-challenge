import { API_TOURNAMENTS_URL } from '../../src/constants/api';

describe('Testing tournaments web app', () => {
  it('should display allt the Tournaments Card after the API call', function() {
    cy.visit('/');
    cy.request(API_TOURNAMENTS_URL).as('tournamentsList');

    cy.get('@tournamentsList').then(({ body }) => {
      const numberOfTournaments = body.length;

      cy.get('.tournament').should('have.length', numberOfTournaments);
    });
  });

  it('should change the language', () => {
    cy.visit('/');
    cy.request(API_TOURNAMENTS_URL).as('tournamentsList');

    cy.get('[data-cy="createButton"]').contains('Create tournament');

    cy.get('.language')
      .contains('it')
      .click();

    cy.get('[data-cy="createButton"]').should('contain', 'Crea torneo');

    cy.get('.language')
      .contains('en')
      .click();

    cy.get('[data-cy="createButton"]').should('contain', 'Create tournament');
  });
});
