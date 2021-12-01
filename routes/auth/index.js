const express = require('express');
const { Usuario } = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthRouter = express.Router();

const saltRounds = 10;

AuthRouter.post('/signup', async (req, res) => {
    const { nombres, apellidoMaterno, apellidoPaterno, email, contrasenia, identificacion, epsId } = req.body;
    const usuario = await Usuario.findOne({ where: { identificacion: identificacion } });

    bcrypt.genSalt(saltRounds, async (err, salt) => {
        bcrypt.hash(contrasenia, salt, async (err, hash) => {
            if (usuario) {
                res.status(409).json({
                    message: 'El usuario ya existe'
                });
            } else {
                const usuario = await Usuario.create({
                    nombres,
                    apellidoMaterno,
                    apellidoPaterno,
                    email,
                    contrasenia: hash,
                    identificacion,
                    epsId
                });

                res.status(201).json({ message: 'Usuario creado', usuario });
            }
        });
    });
});

AuthRouter.post('/signin', async (req, res) => {
    const {email, contrasenia} = req.body;
    const usuario = await Usuario.findOne({ where: { email: email } });
    if (usuario) {
        bcrypt.compare(contrasenia, usuario.contrasenia, async (err, result) => {
            if (result) {
                var token = jwt.sign({
                    identificacion: usuario.identificacion,
                    nombres: usuario.nombres,
                    email: usuario.email,
                },'SECRET');
                res.status(200).json({
                    message: 'Usuario autenticado',
                    token: token
                });
            } else {
                res.status(401).json({
                    message: 'Contraseña incorrecta'
                });
            }
        });
    }
});

module.exports = AuthRouter;