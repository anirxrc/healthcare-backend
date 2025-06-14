import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

// Register validation middleware
const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Login validation middleware
const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Register route
router.post('/register', registerValidation, register);

// Login route
router.post('/login', loginValidation, login);

export default router; 