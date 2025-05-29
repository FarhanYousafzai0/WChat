
import jwt from 'jsonwebtoken'
import User from '../Models/UserMode';

export const Authentication = async(req,res,next)=>{

const authHeader = req.headers.authorization;

//First_Step: Check the token start with Bear
if(authHeader && authHeader.startWiht('Bearer')){
    const token = authHeader.split(' ')[1]


    try {
const decoded = jwt.verify(token,process.env.SECRET);

// Find User id :in the jwt t
const currentUser = User.findById(decoded.id)


if(!currentUser){
    res.status(400).json({message:"User not found"})
}

    } catch (error) {
        
    }

}
// Second_Step:Decode the jwt token:



}