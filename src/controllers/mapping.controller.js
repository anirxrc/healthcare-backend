import { Patient, Doctor, PatientDoctor } from '../models/index.js';

export const createMapping = async (req, res) => {
  try {
    const { patientId, doctorId, notes } = req.body;

    // Check if patient exists and belongs to the user
    const patient = await Patient.findOne({
      where: {
        id: patientId,
        userId: req.user.id
      }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if doctor exists
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Create mapping
    const mapping = await PatientDoctor.create({
      patientId,
      doctorId,
      notes
    });

    res.status(201).json(mapping);
  } catch (error) {
    res.status(500).json({ message: 'Error creating mapping', error: error.message });
  }
};

export const getAllMappings = async (req, res) => {
  try {
    const mappings = await PatientDoctor.findAll({
      include: [
        {
          model: Patient,
          where: { userId: req.user.id },
          required: true
        },
        {
          model: Doctor,
          required: true
        }
      ]
    });
    res.json(mappings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mappings', error: error.message });
  }
};

export const deleteMapping = async (req, res) => {
  try {
    const mapping = await PatientDoctor.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Patient,
          where: { userId: req.user.id },
          required: true
        }
      ]
    });

    if (!mapping) {
      return res.status(404).json({ message: 'Mapping not found' });
    }

    await mapping.destroy();
    res.json({ message: 'Mapping deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting mapping', error: error.message });
  }
}; 