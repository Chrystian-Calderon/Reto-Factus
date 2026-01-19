import express from "express";
import UserController from "../controllers/user.controller.js";
import { loginSchema } from '../validations/login.validation.js';
import { validate } from '../middlewares/validate.js';
import auth from '../middlewares/auth.js';

const authRouter = ({ UserModel }) => {
  const router = express.Router();
  const userController = new UserController({ UserModel });

  router.post("/login", validate(loginSchema), userController.login.bind(userController));
  router.get("/me", auth, userController.getMe.bind(userController));
  router.post("/logout", auth, userController.logout.bind(userController));

  return router;
};

export default authRouter;