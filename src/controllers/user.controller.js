const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRPYT);


const create = async(req, res) => {

    try {

        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({
                message: "Faltan datos obligatorios",
                error: "Campos requeridos: name, password"
            });
        }


        const usuario = new Usuario({
            name,
            password: bcrypt.hashSync(password, saltosBcrypt),
        });

        const resultado = await usuario.createUsuario();

        if (!resultado) {
            return res.status(400).json({
                message: "Error al crear el usuario",
                error: "Error desconocido al insertar en la base de datos"
            });
        }

        return res.status(201).json({
            message: "Usuario creado exitosamente",
            usuario
        });


    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor a crear el usuario",
            error: error.message
        })
    }
}

module.exports = {
    create
}