
import userSignup from '../model/userSignupSchema.js'


const signupPost = async (req,res)=>{
    console.log(req.body);
    
    let userDetails = req.body
     await userSignup.create(userDetails)

}

export default {signupPost}