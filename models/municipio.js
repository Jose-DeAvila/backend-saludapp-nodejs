module.exports = (sequelize, type) => {
  return sequelize.define(
    "municipios",
    {
      id: {
        type: type.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: type.STRING,
        allowNull: false,
        required: true,
      },
      departamentoId: {
        type: type.INTEGER,
        references: {
          model: "departamentos",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
