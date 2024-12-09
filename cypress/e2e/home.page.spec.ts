describe('Página de Inicio', () => {
  beforeEach(() => {
    // Asumiendo que el usuario ya está autenticado y puede acceder a la página
    cy.visit('/home'); 
  });

  it('debería mostrar el mensaje de bienvenida con el nombre de usuario', () => {
    cy.get('.welcome-message h2')
      .should('contain.text', 'Bienvenido, Usuario!'); // Verifica que el nombre del usuario esté presente
  });

  it('debería mostrar los indicadores económicos correctamente', () => {
    cy.get('.economic-indicators-title')
      .should('contain.text', 'Indicadores Económicos'); // Verifica que el título esté presente
  
    cy.get('.economic-indicators ion-card') // Asegúrate de seleccionar solo los ion-card dentro de economic-indicators
      .should('have.length', 3) // Verifica que hay 3 indicadores
      .each(($card) => {
        cy.wrap($card).find('h2').should('be.visible'); // Verifica que el nombre de cada indicador (Dólar, Euro, Bitcoin) sea visible
        cy.wrap($card).find('p').should('contain.text', 'Cargando...'); // Verifica que el valor de cada indicador sea "Cargando..."
      });
  });
  it('debería mostrar el mensaje cuando no hay artículos en la colección', () => {
    // Simula que no hay artículos y verifica que el mensaje adecuado se muestre
    cy.get('ion-card')
      .should('contain.text', 'No hay artículos en la colección.'); // Verifica que el mensaje se muestre correctamente
  });

  it('debería mostrar el mensaje cuando no hay artículos en la colección', () => {
    // Simula que no hay artículos y verifica que el mensaje adecuado se muestre
    cy.get('ion-card')
      .should('contain.text', 'No hay artículos en la colección.'); // Verifica que el mensaje se muestre correctamente
  });

});
