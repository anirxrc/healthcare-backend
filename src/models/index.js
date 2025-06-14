import sequelize from '../config/database.js';
import User from './user.model.js';
import Patient from './patient.model.js';
import Doctor from './doctor.model.js';
import PatientDoctor from './patient-doctor.model.js';

// Many-to-Many relationship between Patient and Doctor
Patient.belongsToMany(Doctor, { through: PatientDoctor });
Doctor.belongsToMany(Patient, { through: PatientDoctor });

export {
  sequelize,
  User,
  Patient,
  Doctor,
  PatientDoctor
}; 