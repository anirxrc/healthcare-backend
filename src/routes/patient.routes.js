import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middleware/auth.middleware.js';
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from '../controllers/patient.controller.js';

const router = express.Router();

// Validation middleware
const patientValidation = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('dateOfBirth').isDate().withMessage('Valid date of birth is required'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Valid gender is required'),
  body('contactNumber').notEmpty().withMessage('Contact number is required'),
  body('address').notEmpty().withMessage('Address is required')
];

// Create patient
router.post('/', authenticateToken, patientValidation, createPatient);

// Get all patients for the authenticated user
router.get('/', authenticateToken, getAllPatients);

// Get specific patient
router.get('/:id', authenticateToken, getPatientById);

// Update patient
router.put('/:id', authenticateToken, patientValidation, updatePatient);

// Delete patient
router.delete('/:id', authenticateToken, deletePatient);

export default router; 