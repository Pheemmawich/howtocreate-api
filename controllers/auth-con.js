const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs")

exports.register = async (req,res,next)=>{
    try{
        //code
        // Step 1 req.body
        const { email, firstname, lastname, password, confirmPassword} = req.body;
        // Step 2 validate
   
        // Step 3 Check already
        const checkEmail = await prisma.profile.findFirst({
            where:{
                email: email,
            },
        });
        console.log(checkEmail);
        if(checkEmail){
            return createError(400, "Email is already exist!!!");
        }
        // Step 4 Encrypt bcrypt
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        console.log(hashedPassword);
        console.log(salt)
        // Step 5 Insert to DB
        const profile = await prisma.profile.create({
            data:{
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: hashedPassword,
            }
        })
        // Step 6 Response
        res.json({message:"hello register"});
    }catch(error){
        console.log("Step 2 Catch");
       next(error);
    };
}

exports.login = async (req,res,next)=>{
    try {
        // Step 1 req.body
        const {email,password} = req.body;
        console.log(email, password);
        // Step 2 Check email and password
        const profile = await prisma.profile.findFirst({
            where:{
                email:email,
            }
        })
        console.log(profile)
        // Step 3 Generate token
        // Step 4 Response

        res.json({message:"hello login"})
    } catch (error) {
        next(error)
    }    
}