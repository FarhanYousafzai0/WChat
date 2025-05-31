import mongoose from "mongoose";



const MessageSchema = mongoose.Schema({


    sender_id:{
        type:Number,
        ref:'User',
        required:true
    },
    receiver_id:{
        type:Number,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        requred:true,

    },
    time:{
        type:Date,
        default:Date.now
    }


},{timestamps:true});




export const Messages = mongoose.Model('Message',MessageSchema);