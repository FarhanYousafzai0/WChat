import express from 'express'
import { GetAllUsers, LoginUser, Register } from '../Controllers/UserController.js';


const Router = express.Router();



Router.post('/register',Register);

Router.post('/login',LoginUser);

Router.get('/Users',GetAllUsers);

export default Router