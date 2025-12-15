import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';

const router = Router();

// POST /auth/register
router.post(
  '/auth/register',
  celebrate(registerUserSchema),
  registerUser
);

// POST /auth/login
router.post(
  '/auth/login',
  celebrate(loginUserSchema),
  loginUser
);

// POST /auth/refresh
router.post(
  '/auth/refresh',
  refreshUserSession
);

// POST /auth/logout
router.post(
  '/auth/logout',
  logoutUser
);

// POST /auth/request-reset-email
router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail
);

// POST /auth/reset-password
router.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword
);

export default router;
