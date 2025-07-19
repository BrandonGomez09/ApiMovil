const e = require('cors');
const Task = require('../models/task.model');



const create = async(req, res) => {

    try {

        const { name, description, id_user } = req.body;

        if (!name || !description || !id_user) {
            return res.status(400).json({
                message: "Faltan datos obligatorios",
                error: "Campos requeridos: name, password, id_user"
            });
        }


        const task = new Task({
            name,
            description,
            id_user
        });

        const resultado = await task.createtask();

        if (!resultado) {
            return res.status(400).json({
                message: "Error al crear la tarea",
                error: "Error desconocido al insertar en la base de datos"
            });
        }

        return res.status(201).json({
            message: "Tarea creado exitosamente",
            data: task
        });


    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor a crear la tarea",
            error: error.message
        })
    }
}

const getTaskById = async (req, res) => {
    try {
        const { id_user } = req.params;

        
        const getTaskById = await Task.getTask(id_user);
        
            return res.status(200).json(getTaskById);
    } catch (error) {
       
        return res.status(500).json({
            message: "Error en el servidor al obtener las tareas",
            error: error.message
        });
    }
};


const getTastAll = async (req, res) => {
    try {
    

        const gettaskbyId = await Task.getAll();

        return res.status(200).json(gettaskbyId)
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al obtener todas las task por ID",
            error: error.message
        })
    }
}

module.exports = {
    create,
    getTaskById,
    getTastAll
}