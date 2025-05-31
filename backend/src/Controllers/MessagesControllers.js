import { Messages } from "../Models/MessagesModel.js"





export const PostMessages = async(req,res)=>{
const {sender_id,receiver_id,message} = req.body



const newMessage = new Messages({
    sender_id,
    receiver_id,
    message
});



res.status(200).json(newMessage);

}