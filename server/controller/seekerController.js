
import userSignup from '../model/userSignupSchema.js'
import bcrypt from 'bcrypt'


const signupPost = async (req,res)=>{
    console.log(req.body)
    const {firstName,lastName,email,password,phoneNumber} = req.body
    const user = await userSignup.findOne({email:email})
    if(user){
        console.log(user)
        res.json({ "status": "failed", "message": "Email already exist login now" })
    }else{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password.trim(), salt)
        await userSignup.create({
            firstName,
            lastName,
            email,
            password:hashPassword,
            phoneNumber
        })
        res.json({ "status": "success", "message": "signup success" })
    }

}

export default {signupPost}