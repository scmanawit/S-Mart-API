import { Router } from 'express'
import authController from '../controllers/authController.js';
import usersController from '../controllers/usersController.js';
import { admin, authenticated } from '../middlewares/auth.js';

const authRoute = Router();

authRoute.post("/register", authController.register);
authRoute.post("/register/admin", [authenticated, admin], authController.registerAdmin);
authRoute.post("/login", authController.login);
authRoute.get("/profile", usersController.profile)

export default authRoute;