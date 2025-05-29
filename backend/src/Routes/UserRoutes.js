import express from 'express'
import { LoginUser, Register } from '../Controllers/UserController.js';


const Router = express.Router();



Router.post('/register',Register);

Router.post('/login',LoginUser);


export default Router