describe('template spec', () => {
  it('cannot navigate to /profile-sg without being logged in', () => {
    cy.visit("/logout")
    .url().should('include', "/login");
  });
})