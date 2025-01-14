describe('NY Times Articles App', () => {
  it('should display the list of articles', () => {
    cy.visit('/');
    cy.contains('NY Times Most Viewed Articles');
  });

  it('should navigate to article detail page', () => {
    cy.visit('/');
    cy.contains('NY Times Most Viewed Articles');
    cy.get('ul > li > a').first().click();
    cy.url().should('include', '/article/');
  });
});
