module.exports = (sequelize, type) => {
  return sequelize.define(
    "eps",
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
    },
    {
      timestamps: false,
    }
  );
};
