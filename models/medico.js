module.exports = (sequelize, type) => {
  return sequelize.define(
    "medicos",
    {
      identificacion: {
        type: type.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      apellidos: {
        type: type.STRING,
        allowNull: false,
        required: true,
      },
      nombres: {
        type: type.STRING,
        allowNull: false,
        required: true,
      },
      epsId: {
        type: type.INTEGER,
        references: {
          model: "eps",
          key: "id",
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
