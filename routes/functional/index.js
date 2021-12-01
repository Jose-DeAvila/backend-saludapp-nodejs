const express = require('express');
const { Usuario, Citas, Medico } = require('../../db');
const functionalRouter = express.Router();

functionalRouter.get('/getCitasMedicas', async (req, res) => {
    const document = req.decoded.identificacion;
    const citas = await Citas.findAll({ where: { usuarioId: document} });
    if(citas) {
        res.status(200).json({
            message: 'Citas encontradas',
            citas
        });
    } else {
        res.status(404).json({
            message: 'No se encontraron citas'
        });
    }
});

functionalRouter.post('/createCita', async (req, res) => {
    const document = req.decoded.identificacion;
    const { fecha, hora, medicoId, especialidadId, municipioId } = req.body;
    const cita = await Citas.create({
        fecha,
        hora,
        usuarioId: document,
        medicoId,
        especialidadId,
        municipiosId: municipioId
    });

    res.status(201).json({message: 'Cita creada', cita});
});

module.exports = functionalRouter;