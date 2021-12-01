const Sequelize = require("sequelize");

const epsModel = require("./models/eps");
const usuarioModel = require("./models/usuarios");
const especialidadModel = require("./models/especialidad");
const departamentoModel = require("./models/departamentos");
const medicoModel = require("./models/medico");
const municipioModel = require("./models/municipio");
const citasmedicasModel = require("./models/citasMedicas");
const examenModel = require("./models/examenMedico");
const laboratorioModel = require("./models/laboratorio");

const sequelize = new Sequelize("proyecto-web", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Eps = epsModel(sequelize, Sequelize);
const Usuario = usuarioModel(sequelize, Sequelize);
const Especialidad = especialidadModel(sequelize, Sequelize);
const Departamento = departamentoModel(sequelize, Sequelize);
const Medico = medicoModel(sequelize, Sequelize);
const Municipio = municipioModel(sequelize, Sequelize);
const Citas = citasmedicasModel(sequelize, Sequelize);
const Examenes = examenModel(sequelize, Sequelize);
const Laboratorio = laboratorioModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas");
});

Eps.hasOne(Medico, {foreignKey:"epsId"});
Medico.belongsTo(Eps, { foreignKey:"epsId", onDelete: "cascade", onUpdate: "cascade" });

Eps.hasOne(Usuario, {forenKey:"epsId"});
Usuario.belongsTo(Eps, {forenKey:"epsId", onDelete: "cascade", onUpdate: "cascade" });

Especialidad.hasOne(Medico, {foreignKey:"especialidadId"});
Medico.belongsTo(Especialidad, { foreignKey:"especialidadId", onDelete: "cascade", onUpdate: "cascade" });

Departamento.hasOne(Municipio,{foreignKey:"departamentoId"});
Municipio.belongsTo(Departamento, { foreignKey:"departamentoId", onDelete: "cascade", onUpdate: "cascade" });

Usuario.hasOne(Citas, {foreignKey:"usuarioId"});
Citas.belongsTo(Usuario, { foreignKey:"usuarioId", onDelete: "cascade", onUpdate: "cascade" });

Medico.hasOne(Citas, {foreignKey:"medicoId"});
Citas.belongsTo(Medico, { foreignKey:"medicoId", onDelete: "cascade", onUpdate: "cascade" });

Especialidad.hasOne(Citas, {foreignKey:"especialidadId"});
Citas.belongsTo(Especialidad, { foreignKey:"especialidadId", onDelete: "cascade", onUpdate: "cascade" });

Municipio.hasOne(Citas, {foreignKey:"municipiosId"});
Citas.belongsTo(Municipio, {foreignKey:"municipiosId", onDelete: "cascade", onUpdate: "cascade" });

Usuario.hasOne(Laboratorio,{foreignKey: "usuarioId"} );
Laboratorio.belongsTo(Usuario, {foreignKey: "usuarioId", onDelete: "cascade", onUpdate: "cascade" });

Especialidad.hasOne(Laboratorio,{foreignKey: "especialidadId"});
Laboratorio.belongsTo(Especialidad, { foreignKey: "especialidadId", onDelete: "cascade", onUpdate: "cascade"});

Examenes.hasOne(Laboratorio , {foreignKey:"examenId"});
Laboratorio.belongsTo(Examenes, {foreignKey:"examenId", onDelete: "cascade", onUpdate: "cascade" });

module.exports = {
  Eps,
  Usuario,
  Especialidad,
  Departamento,
  Medico,
  Municipio,
  Citas,
  Laboratorio,
  Examenes,
};
