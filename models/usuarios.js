module.exports = (sequelize, type) => {
    return sequelize.define('usuarios', {
        identificacion: {
            type: type.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        apellidoPaterno: {
            type: type.STRING,
            allowNull: false,
            required: true
        },
        apellidoMaterno: {
            type: type.STRING,
            allowNull: false,
            required: true
        },
        nombres: {
            type: type.STRING,
            allowNull: false,
            required: true
        },
        email: {
            type: type.STRING,
            allowNull: false,
            required: true
        },
        contrasenia: {
            type: type.STRING,
            allowNull: false,
            required: true
        },
        epsId: {
            type: type.INTEGER,
            references: {
                model: "eps",
                key: "id",
            },
        }
    }, {
        timestamps: false,
    });
}