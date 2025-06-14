import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middleware/auth.middleware.js';
import {
  createMapping,
  getAllMappings,
  deleteMapping
} from '../controllers/mapping.controller.js';

const router = express.Router();

// Validation middleware
const mappingValidation = [
  body('patientId').isUUID().withMessage('Valid patient ID is required'),
  body('doctorId').isUUID().withMessage('Valid doctor ID is required')
];

// Create patient-doctor mapping
router.post('/', authenticateToken, mappingValidation, createMapping);

// Get all mappings for a user's patients
router.get('/', authenticateToken, getAllMappings);

// Delete mapping
router.delete('/:id', authenticateToken, deleteMapping);

export default router; 