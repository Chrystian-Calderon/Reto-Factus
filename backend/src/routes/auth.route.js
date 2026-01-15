import express from "express";
import UserController from "../controllers/user.controller.js";
import auth from '../middlewares/auth.js';

const authRouter = ({ UserModel }) => {
  const router = express.Router();
  const userController = new UserController({ UserModel });

  router.post("/login", userController.login.bind(userController));
  router.post("/logout", auth, userController.logout.bind(userController));

  return router;
};

export default authRouter;