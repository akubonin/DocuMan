describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/') 
    cy.contains('Dasboard');
    cy.contains('Wiki');
  })
})

describe('Image Upload', () => {
  it('should upload an image', () => {
    cy.visit('/upload');
    cy.wait(8000);
    cy.get('input[type=file]').selectFile('cypress/e2e/mockFiles/Rechnung_123.pdf', {
      action: 'drag-drop',
      force: true, // Use force: true to bypass pointer-events: none
    })

    cy.contains('File uploaded successfully');
  });
});

describe('Dashboard', () => {
  it('should have file', () => {
    cy.visit('/');
    cy.wait(8000);
    cy.contains('_123');
  });
});

