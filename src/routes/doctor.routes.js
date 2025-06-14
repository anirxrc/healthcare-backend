import express from 'express';
import { body } from 'express-validator';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware.js';
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} from '../controllers/doctor.controller.js';

const router = express.Router();

// Validation middleware
const doctorValidation = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('specialization').notEmpty().withMessage('Specialization is required'),
  body('licenseNumber').notEmpty().withMessage('License number is required'),
  body('contactNumber').notEmpty().withMessage('Contact number is required'),
  body('email').isEmail().withMessage('Valid email is required')
];

// Create doctor (admin only)
router.post('/', authenticateToken, isAdmin, doctorValidation, createDoctor);

// Get all doctors
router.get('/', authenticateToken, getAllDoctors);

// Get specific doctor
router.get('/:id', authenticateToken, getDoctorById);

// Update doctor (admin only)
router.put('/:id', authenticateToken, isAdmin, doctorValidation, updateDoctor);

// Delete doctor (admin only)
router.delete('/:id', authenticateToken, isAdmin, deleteDoctor);

export default router; 