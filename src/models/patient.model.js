import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.model.js';

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  medicalHistory: {
    type: DataTypes.TEXT
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
});

// Define relationship with User
Patient.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Patient, { foreignKey: 'userId' });

export default Patient; 