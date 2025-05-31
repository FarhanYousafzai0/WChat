import express from 'express'
import { PostMessages } from '../Controllers/MessagesControllers';

const Router = express.Router();




Router.post('/Post-message',PostMessages);








export default Router