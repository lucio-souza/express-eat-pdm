import UserController from "../controller/UserController";
import express  from "express";
import { verifyToken } from "../middlewares/verifyToken";

const userRouter = express.Router();

userRouter.post('/login',UserController.authenticateUser)
userRouter.get('/',UserController.listAllUsers);
userRouter.get('/:id',UserController.listUserById);
userRouter.get('/:email',UserController.listUserByEmail)
userRouter.post('/',UserController.registerUser);
userRouter.put('/',verifyToken,UserController.editUser);
userRouter.delete('/',verifyToken,UserController.eraseUser)
userRouter.post('/restaurante/avaliacao',verifyToken,UserController.createAvaliation)
export default userRouter;