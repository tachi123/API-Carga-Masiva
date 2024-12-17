import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Script = sequelize.define('Script', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  tableName: 'scripts',
  timestamps: false,
});

export default Script;