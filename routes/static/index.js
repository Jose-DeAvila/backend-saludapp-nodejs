const express = require('express');
const { Especialidad, Eps, Departamento, Examenes, Municipio, Medico, Laboratorio } = require('../../db');
var StaticsRouter = express.Router();
require('isomorphic-fetch');

(async () => {
    createDepartamentos();
    createMunicipios();
    createEps();
    createEspecialidades();
    createMedicos();
    createExamenes();
    createLaboratorios();
})()

async function createDepartamentos() {
    const count = await Departamento.count();
    if (count < 32) {
        const urlDepartment = "https://www.datos.gov.co/resource/xdk5-pm3f.json?$query=select%20distinct%20departamento";
        const response = await fetch(urlDepartment);
        const departments = await response.json();

        departments.forEach(async (department) => {
            const { departamento } = department;
            const departmentRegistered = await Departamento.findOne({ where: { nombre: departamento } });
            if (!departmentRegistered) {
                await Departamento.create({ nombre: departamento });
            }
        });

        console.info('Departamentos creados');
    }
}

async function createMunicipios() {
    const count = await Municipio.count();
    if (count < 1110) {
        const urlMunicipalities = "https://www.datos.gov.co/resource/xdk5-pm3f.json";
        const response = await fetch(urlMunicipalities);
        const municipalities = await response.json();

        municipalities.forEach(async (municipality) => {
            const { departamento, municipio } = municipality;
            const department = await Departamento.findOne({ where: { nombre: departamento } });
            const municipalityRegistered = await Municipio.findOne({ where: { nombre: municipio } });
            if (!municipalityRegistered) {
                await Municipio.create({ nombre: municipio, departamentoId: department.id });
            }
        });

        const urlMunicipalities2 = "https://www.datos.gov.co/resource/xdk5-pm3f.json?$offset=1000";
        const response2 = await fetch(urlMunicipalities2);
        const municipalities2 = await response2.json();

        municipalities2.forEach(async (municipality) => {
            const { departamento, municipio } = municipality;
            const department = await Departamento.findOne({ where: { nombre: departamento } });
            const municipalityRegistered = await Municipio.findOne({ where: { nombre: municipio } });
            if (!municipalityRegistered) {
                await Municipio.create({ nombre: municipio, departamentoId: department.id });
            }
        });

        console.info('Municipios creados');
    }
}

async function createEps() {
    const count = await Eps.count();
    if (count < 43) {
        const urlEps = "https://www.datos.gov.co/resource/nxzb-zwty.json?$query=select%20distinct%20eps";
        const response = await fetch(urlEps);
        const epssRecovered = await response.json();
    
        epssRecovered.forEach(async (epsRecovered) => {
            const { eps } = epsRecovered;
            const epsRegistered = await Eps.findOne({ where: { nombre: eps } });
            if (!epsRegistered) {
                await Eps.create({ nombre: eps });
            }
        });
    }

    console.log('EPS creados');
}

async function createEspecialidades(){
    const count = await Especialidad.count();
    if(count < 40){
        const urlEspecialidades = "https://www.datos.gov.co/resource/6fig-bbc5.json?$query=select%20distinct%20especialidad"
        const response = await fetch(urlEspecialidades);
        const especialidades = await response.json();

        especialidades.forEach(async (especialidad) => {
            const { especialidad: nombre } = especialidad;
            const especialidadRegistered = await Especialidad.findOne({ where: { nombre: nombre } });
            if(!especialidadRegistered){
                await Especialidad.create({ nombre });
            }
        });
    }

    console.log('Especialidades creadas');
}

async function createMedicos(){
    const count = await Medico.count();
    if(count < 16){
        const urlMedicos = "https://api.jsonbin.io/b/61a59e150ddbee6f8b144cc9";
        const response = await fetch(urlMedicos);
        const medicos = await response.json();

        medicos.forEach(async (medico) => {
            const {nombres, apellidos, identificacion, epsId, especialidadId } = medico;
            const medicoRegistered = await Medico.findOne({ where: { identificacion: identificacion, epsId } });
            if(!medicoRegistered){
                await Medico.create({ nombres, apellidos, identificacion, epsId, especialidadId });
            }
        });
    }

    console.log('Medicos creados');
}

async function createExamenes(){
    const count = await Examenes.count();
    if(count < 16){
        const urlExamenes = "https://api.jsonbin.io/b/61a6941062ed886f9157a8f9";
        const response = await fetch(urlExamenes);
        const examenes = await response.json();

        examenes.forEach(async (examen) => {
            const {nombre} = examen;
            const examenRegistered = await Examenes.findOne({ where: { nombre: nombre } });
            if(!examenRegistered){
                await Examenes.create({ nombre });
            }
        });
    }

    console.log('Examenes creados');
}

async function createLaboratorios(){
    const count = await Laboratorio.count();
    if(count < 4){
        const urlLaboratorios = "https://api.jsonbin.io/b/61a6b83c0ddbee6f8b14f114";
        const respnse = await fetch(urlLaboratorios);
        const laboratorios = await respnse.json();

        laboratorios.forEach(async (laboratorio) => {
            const {fecha, valoracion, usuarioId, examenId, especialidadId} = laboratorio;
            await Laboratorio.create({ 
                fecha,
                valoracion,
                usuarioId,
                examenId,
                especialidadId
            });
        });
    }

    console.log('Laboratorios creados');
}

module.exports = StaticsRouter;