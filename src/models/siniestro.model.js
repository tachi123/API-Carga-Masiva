import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Siniestro = sequelize.define('Siniestro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  numero_formulario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hora_carga: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tipo_siniestro: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  reporte: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
}, {
  tableName: 'siniestros',
  timestamps: false,
});

export default Siniestro;