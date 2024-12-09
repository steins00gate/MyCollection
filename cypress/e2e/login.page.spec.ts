describe('Página de Login', () => {
  beforeEach(() => {
    // Visitar la página de login antes de cada prueba
    cy.visit('/login');
  });

  it('debería mostrar los elementos del formulario de login', () => {
    // Verificar que los elementos principales estén presentes
    cy.get('ion-input[name="usuario"]').should('exist');
    cy.get('ion-input[name="password"]').should('exist');
    cy.get('ion-button[type="submit"]').should('exist');
    cy.contains('¿No tienes una cuenta?').should('be.visible');
    cy.get('ion-button').contains('Registrarse').should('exist');
  });

  it('debería deshabilitar el botón de enviar cuando el formulario es inválido', () => {
    cy.get('ion-input[name="usuario"]').type('us'); // Menos de 3 caracteres
    cy.get('ion-input[name="password"]').type('12'); // Contraseña muy corta
    
    // Verificar mediante el atributo disabled
    cy.get('ion-button[type="submit"]')
      .should('have.attr', 'disabled');
  });

  it('debería validar el campo de usuario vacío', () => {
    // Intentar enviar el formulario sin usuario
    cy.get('ion-input[name="password"]').type('1234');
    
    // Verificar que el botón de enviar esté deshabilitado
    cy.get('ion-button[type="submit"]')
      .should('have.attr', 'disabled');
    
    // Verificar que no se puede navegar
    cy.url().should('include', '/login');
  });

  it('debería mostrar un error para la contraseña vacía', () => {
    // Probar validación de campo de contraseña vacío
    cy.get('ion-input[name="usuario"]').type('testuser');
  
    // Verificar que el botón de enviar esté deshabilitado
    cy.get('ion-button[type="submit"]')
      .should('have.attr', 'disabled');
  
    // Verificar que no se puede navegar
    cy.url().should('include', '/login');
  });

  it('debería navegar a la página de registro', () => {
    // Verificar navegación a la página de registro
    cy.get('ion-button').contains('Registrarse').click();
    cy.url().should('include', '/registro');
  });

  it('debería mostrar un error para las credenciales inválidas', () => {
    // Crear un objeto de usuario con credenciales incorrectas
    const testUser = {
      username: 'usuarioinvalido',
      password: 'contraseñaincorrecta',
    };
  
    // Completar el formulario de login con los datos incorrectos
    cy.get('input[name="usuario"]').type(testUser.username);
    cy.get('input[name="password"]').type(testUser.password);
  
    // Hacer clic en el botón de enviar
    cy.get('ion-button[type="submit"]').click();
  
    // Verificar que se muestre el mensaje de error
    cy.get('ion-alert').should('be.visible')
      .and('contain', 'Usuario o contraseña incorrectos');
  });
});
