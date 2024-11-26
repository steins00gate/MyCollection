import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite) {}

  // Inicializar la base de datos
  async initializeDatabase() {
    this.dbInstance = await this.sqlite.create({
      name: 'mycollection.db',
      location: 'default',
    });
    await this.createTables();
  }

  // Crear tablas de la base de datos
  async createTables() {
    await this.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        usuario TEXT,
        password TEXT,
        nombre TEXT,
        email TEXT UNIQUE
      )`,
      []
    );

    await this.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS articulos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        categoria TEXT,
        comentarios TEXT,
        imagen BLOB
      )`,
      []
    );

    await this.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS deseos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        categoria TEXT,
        comentarios TEXT
      )`,
      []
    );
  }

  // Registro de usuario
  async registrarUser(usuario: string, password: string, nombre: string, email: string): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(
        `INSERT INTO users (usuario, password, nombre, email) VALUES (?, ?, ?, ?)`,
        [usuario, password, nombre, email]
      );
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }

  // Login de usuario
  async loginUser(usuario: string, password: string): Promise<boolean> {
    const result = await this.dbInstance.executeSql(
      `SELECT * FROM users WHERE usuario = ? AND password = ?`,
      [usuario, password]
    );
    return result.rows.length > 0;
  }

  // Obtener todos los artículos
  async getArticulos() {
    const result = await this.dbInstance.executeSql(`SELECT * FROM articulos`, []);
    const articulos = [];
    for (let i = 0; i < result.rows.length; i++) {
      articulos.push(result.rows.item(i));
    }
    return articulos;
  }

  // Agregar un artículo
  async addArticulo(nombre: string, categoria: string, comentarios: string, imagen: any): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(
        `INSERT INTO articulos (nombre, categoria, comentarios, imagen) VALUES (?, ?, ?, ?)`,
        [nombre, categoria, comentarios, imagen]
      );
      return true;
    } catch (error) {
      console.error('Error al agregar artículo:', error);
      return false;
    }
  }

  // Eliminar un artículo
  async deleteArticulo(id: number): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(`DELETE FROM articulos WHERE id = ?`, [id]);
      return true;
    } catch (error) {
      console.error('Error al eliminar artículo:', error);
      return false;
    }
  }

  // Obtener todos los deseos
  async getDeseos() {
    const result = await this.dbInstance.executeSql(`SELECT * FROM deseos`, []);
    const deseos = [];
    for (let i = 0; i < result.rows.length; i++) {
      deseos.push(result.rows.item(i));
    }
    return deseos;
  }

  // Agregar un deseo
  async addDeseo(nombre: string, categoria: string, comentarios: string): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(
        `INSERT INTO deseos (nombre, categoria, comentarios) VALUES (?, ?, ?)`,
        [nombre, categoria, comentarios]
      );
      return true;
    } catch (error) {
      console.error('Error al agregar deseo:', error);
      return false;
    }
  }

  // Eliminar un deseo
  async deleteDeseo(id: number): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(`DELETE FROM deseos WHERE id = ?`, [id]);
      return true;
    } catch (error) {
      console.error('Error al eliminar deseo:', error);
      return false;
    }
  }

  // Mover un deseo a la colección (artículos)
  async moveDeseoToArticulo(deseoId: number): Promise<boolean> {
    try {
      // Obtener el deseo por su ID
      const deseoResult = await this.dbInstance.executeSql(`SELECT * FROM deseos WHERE id = ?`, [deseoId]);

      if (deseoResult.rows.length > 0) {
        const deseo = deseoResult.rows.item(0);
        const { nombre, categoria, comentarios } = deseo;

        // Agregar el deseo a la colección (artículos)
        const articuloResult = await this.dbInstance.executeSql(
          `INSERT INTO articulos (nombre, categoria, comentarios, imagen) VALUES (?, ?, ?, ?)`,
          [nombre, categoria, comentarios, null] // Deseos no tienen imagen, se pasa como null
        );

        if (articuloResult.insertId) {
          // Eliminar el deseo de la lista
          await this.deleteDeseo(deseoId);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error al mover deseo a colección:', error);
      return false;
    }
  }
}
