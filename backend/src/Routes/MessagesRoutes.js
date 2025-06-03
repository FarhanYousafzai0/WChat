import express from 'express';
import { getMessages, PostMessage } from '../Controllers/MessagesControllers.js';

const Router = express.Router();

Router.post('/post-message', PostMessage);
Router.get('/get-message/:sender_id/:receiver_id', getMessages);

export default Router;
