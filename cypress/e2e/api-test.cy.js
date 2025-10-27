// cypress/e2e/api-test.cy.js
describe('API Connectivity Test', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:3001';
  // Skip API tests em ambiente CI pois não há backend
  const skipInCI = Cypress.env('CI') || Cypress.env('GITHUB_ACTIONS');

  // Use beforeEach to conditionally skip all tests
  beforeEach(() => {
    if (skipInCI) {
      cy.log('🚫 Skipping API tests in CI environment - requires running backend');
    }
  });

  (skipInCI ? it.skip : it)('should be able to call backend API directly', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/api/login`,
      body: {
        username: 'testuser',
        password: 'wrongpass'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.include('Palavra-passe incorreta');
    });
  });

  (skipInCI ? it.skip : it)('should get correct error for right password', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/api/login`,
      body: {
        username: 'testuser',
        password: '123456'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.include('Login desabilitado');
    });
  });

  (skipInCI ? it.skip : it)('should verify health endpoint', () => {
    cy.request(`${apiUrl}/health`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('status', 'OK');
    });
  });
});