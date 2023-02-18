import { Router } from 'express'
import { admin, authenticated, user } from '../middlewares/auth.js'
import usersController from '../controllers/usersController.js'

const userRoute = Router();

// retrieve user profile
userRoute.get("/profile", usersController.profile)

// Route to delete a user
userRoute.delete('/deactivate/:userId', [authenticated, admin], usersController.deactivate)

// deactivate my acct
userRoute.delete('/deactivate', [authenticated, user], usersController.deactivate)

export default userRoute;