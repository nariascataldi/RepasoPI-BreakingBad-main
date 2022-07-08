const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  /**
   *  [ ] Personaje con las siguientes propiedades:
      ID *
      Nombre *
      Nickname *
      Cumpleaños *
      Status
      Imagen
   */
  sequelize.define('character', {
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, //al setearlo en false, le dicimos "no te permito que estes vacío".
      pimaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname:{
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday:{
      type: DataTypes.STRING,
      allowNull: false
    },
    status:{
      type: DataTypes.ENUM('Alive', 'Deceased', 'Presumed dead', 'Unknown'), //es un STRING pero le vamos aasignar una variable de enumeración
      allowNull: true
    },
    img:{
      type: DataType.STRING,
      allowNull: true
    },
    //creado en base de datos local
    createdInDb:{
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
