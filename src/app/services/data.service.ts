import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public dbInstance!: SQLiteObject

  constructor(private sqlite: SQLite) { }

  async initializeDatabase(){
    this.dbInstance = await this.sqlite.create({
      name: 'mycollection.db',
      location: 'default',
    });
    await this.createTables();
  }

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
  }

  //registrar usuario

  async registrarUser(usuario:string, password:string, nombre:string, email: string): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(
        `INSERT INTO users (usuario, password, nombre, email)
        VALUES (?, ?, ?, ?)`,
        [usuario,password,nombre,email]
      );
      return true;
    }catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }

  async loginUser(usuario:string, password: string): Promise<boolean> {
    const result = await this.dbInstance.executeSql(
      'SELECT * FROM users WHERE usuario = ? AND password = ?',
      [usuario,password]
    );
    return result.rows.length>0;
  }
}
