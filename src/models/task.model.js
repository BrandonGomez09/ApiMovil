const db = require('../configs/db.config');

class Usuario {
    constructor({idtasks, name, description, id_user}) {
        this.idtasks = idtasks;
        this.name = name;
        this.description = description;
        this.id_user = id_user;

    }

    async createtask() {
        const connection = await db.createConnection();

        const [result] = await connection.execute("INSERT INTO tasks (name, description, id_user) VALUES (?, ?, ?)",
            [this.name, this.description, this.id_user]
        )

        connection.end();

        if (result.insertId === 0) {
            throw new Error('Error creando el usuario');
        }

        this.id = result.insertId;

        return this.id;

    }

    static async getTask(id_user) {
        const connection = await db.createConnection();

        const [result] = await connection.execute("SELECT idtasks, name, description FROM tasks WHERE id_user = ?", 
            [id_user]
        );

        console.log(result); 
        connection.end();

        return result;

    }


    static async getAll() {
        const connection = await db.createConnection();

        const [result] = await connection.execute("SELECT idtasks, name, description FROM tasks");

        console.log(result); 
        connection.end();

        if (result.length === 0) {
            throw new Error('No se encontró el Usuario');
        }

        return result;

    }

    // Actualizar tarea
static async updateTask(idtasks, name, description) {
    const connection = await db.createConnection();
    const [result] = await connection.execute(
        "UPDATE tasks SET name = ?, description = ? WHERE idtasks = ?",
        [name, description, idtasks]
    );
    connection.end();

    if (result.affectedRows === 0) {
        throw new Error("No se encontró la tarea para actualizar");
    }

    return result;
}

// Eliminar tarea
static async deleteTask(idtasks) {
    const connection = await db.createConnection();
    const [result] = await connection.execute(
        "DELETE FROM tasks WHERE idtasks = ?",
        [idtasks]
    );
    connection.end();

    if (result.affectedRows === 0) {
        throw new Error("No se encontró la tarea para eliminar");
    }

    return result;
}


}

module.exports = Usuario;
