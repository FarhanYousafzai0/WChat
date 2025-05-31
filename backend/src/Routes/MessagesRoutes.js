import express from 'express'
import { PostMessages } from '../Controllers/MessagesControllers.js';
import { Authentication } from '../MIddleware/AuthMiddleware.js';

const Router = express.Router();




Router.post('/Post-message',Authentication,PostMessages);








export default Router