import { Joi, Segments } from 'celebrate';

/* =======================
   REGISTER
======================= */
export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

/* =======================
   LOGIN
======================= */
export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

/* =======================
   REQUEST RESET EMAIL
======================= */
export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
  }),
};

/* =======================
   RESET PASSWORD
======================= */
export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
};
