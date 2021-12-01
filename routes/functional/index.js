const express = require('express');
const { Usuario, Citas, Medico, Laboratorio } = require('../../db');
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

functionalRouter.get('/getLaboratorios', async (req, res) => {
    const document = req.decoded.identificacion;
    const laboratorios = await Laboratorio.findAll({ where: { usuarioId: document} });
    if(laboratorios) {
        res.status(200).json({
            message: 'Laboratorios encontrados',
            laboratorios
        });
    } else {
        res.status(404).json({
            message: 'No se encontraron laboratorios'
        });
    }
});

functionalRouter.post('/createLaboratorio', async (req, res) => {
    const document = req.decoded.identificacion;
    const { fecha, valoracion, especialidadId, examenId } = req.body;
    const cita = await Laboratorio.create({
        fecha,
        valoracion,
        usuarioId: document,
        especialidadId,
        examenId
    });

    res.status(201).json({message: 'Laboratorio creado', cita});
});

module.exports = functionalRouter;