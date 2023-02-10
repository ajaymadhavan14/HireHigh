
import jwt from 'jsonwebtoken'

const jwtSeeker = async(req,res,next)=>{
    const token = req.headers["x-access-token"]
    console.log(req.body)
    if(!token){
        res.send({ "status": "failed", "message": "You need token" })

    } else{
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err){
                console.log(err)
                res.json({auth:false,status:"failed",message:"failed to authenticate"})
            }else{
            console.log(decoded.userId)
            req.userId =decoded.userId
                next();
            }
        })
    }
}

export default {jwtSeeker}