const db = require('../configs/db.config');

class Usuario {
    constructor({id, name, password}) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    async createUsuario() {
        const connection = await db.createConnection();

        const [result] = await connection.execute("INSERT INTO user (name, password) VALUES (?, ?)",
            [this.name, this.password]
        )

        connection.end();

        if (result.insertId === 0) {
            throw new Error('Error creando el usuario');
        }

        this.id = result.insertId;

        return this.id;

    }

    static async deleteUsuario(id) {
        const connection = await db.createConnection();

        const [result] = await connection.execute("DELETE FROM user WHERE id =?", [id]);
        
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error('No se encontró el usuario');
        }

        return
        
    }


    static async getUsername(name) {
        const connection = await db.createConnection();

        const [result] = await connection.execute("SELECT id, password FROM user WHERE name = ?", 
            [name]
        );

        console.log(result); 
        connection.end();

        if (result.length === 0) {
            throw new Error('No se encontró el Usuario');
        }

        return result;

    }


}

module.exports = Usuario;
