module.exports = (sequelize, type) => {
  return sequelize.define(
    "citaMedicas",
    {
      codigo: {
        type: type.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      fecha: {
        type: type.DATEONLY,
        allowNull: false,
        required: true,
      },
      hora: {
        type: type.TIME,
        allowNull: false,
        required: true,
      },
      usuarioId: {
        type: type.BIGINT,
        references: {
          model: "usuarios",
          key: "identificacion",
        },
      },
      medicoId: {
        type: type.BIGINT,
        references: {
          model: "medicos",
          key: "identificacion",
        },
      },
      especialidadId: {
        type: type.INTEGER,
        references: {
          model: "especialidades",
          key: "id",
        },
      },
      municipiosId: {
        type: type.INTEGER,
        references: {
          model: "municipios",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
