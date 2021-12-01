module.exports = (sequelize, type) => {
  return sequelize.define(
    "laboratorio",
    {
      muestra: {
        type: type.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha: {
        type: type.DATEONLY,
        allowNull: false,
        required: true,
      },
      valoracion: {
        type: type.STRING,
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
      examenId: {
        type: type.INTEGER,
        references: {
          model: "examenMedicos",
          key: "codigo",
        },
      },
      especialidadId: {
        type: type.INTEGER,
        references: {
          model: "especialidades",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
