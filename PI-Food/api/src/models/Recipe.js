const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo receta
  const Recipe = sequelize.define("recipe", {
    id: {
      //encontrar un id mas seguro, creo que ahora esta bien
      allowNull: false,
      //autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.UUID,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
    },
    healthScore: {
      type: DataTypes.INTEGER,
    },
    instructions: {
      type: DataTypes.STRING,
    },
  });
  const Diet = sequelize.define("diet", {
    id: {
      //encontrar un id mas seguro, creo que ahora esta bien
      allowNull: false,
      // autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.UUID,
    },
    dietName: {
      type: DataTypes.STRING,
      //allowNull: false,
    //  unique: true,
    },
  });
};
