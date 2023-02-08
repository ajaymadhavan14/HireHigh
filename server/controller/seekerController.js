
import userModel from '../model/userSignupSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const signupPost = async (req,res)=>{
    console.log(req.body)
    const {firstName,lastName,email,password,phoneNumber} = req.body
    const user = await userModel.findOne({email:email})
    if(user){
        console.log(user)
        res.json({ "status": "failed", "message": "Email already exist login now" })
    }else{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password.trim(), salt)
        await userModel.create({
            firstName,
            lastName,
            email,
            password:hashPassword,
            phoneNumber
        })
        res.json({ "status": "success", "message": "signup success" })
    }

}

const signinPost = async(req,res)=>{
    console.log(req.body);

    const {email,password} = req.body
    const user = await userModel.findOne({email:email})
    if(user){
        const isMatch = await bcrypt.compare(password,user.password)
        if(user.email ===email && isMatch){
            const userId= user._id
            const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,
                { expiresIn:300 })
               
            res.json({"auth":true,"token":token,"result":user, "status": "success", "message": "signin success" })

        }else{
            res.json({"auth":false, "status": "failed", "message": "User password is incorrect" })

        }
    }else{
        res.json({"auth":false, "status": "failed", "message": "No user please register" })

    }
}

export default {signupPost,signinPost}