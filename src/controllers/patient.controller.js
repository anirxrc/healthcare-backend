import { Patient } from '../models/index.js';

export const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error creating patient', error: error.message });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      where: { userId: req.user.id }
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    await patient.update(req.body);
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    await patient.destroy();
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error: error.message });
  }
}; 