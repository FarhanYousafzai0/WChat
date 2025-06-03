import express from 'express'
import { GetAllUsers, LoginUser, Register, updateUsername } from '../Controllers/UserController.js';
import { Authentication } from '../MIddleware/AuthMiddleware.js';


const Router = express.Router();



Router.post('/register',Register);

Router.post('/login',LoginUser);

Router.get('/Users',GetAllUsers);


Router.put('/update-username',updateUsername)

export default Router