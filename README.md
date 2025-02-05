# Server

## Step 1 create package
```bash
npm init -y
```

## Step 2 install package....
```bash
npm install express nodemon cors morgan bcryptjs jsonwebtoken zod
```
```bash
npx prisma init
```
## Step 3 Git
```bash
git init
git add .
git commit -m "message"
```

next Step
copy code from repo
only first time
```bash
git remote add origin https://github.com/Pheemmawich/howtocreate-api.git
git branch -M main
git push -u origin main
```

when update code
```bash
git add .
git commit -m "message"
git push
```

## Step 4 update package.json
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js",
    "dev": "nodemon index.js"
  },
```

and code
index.js
```js
const express = require("express")
const app = express()

// Start Server
const PORT = 8000
app.listen(PORT,()=> console.log(`Server is runnig on port ${PORT}`))
```

## Step 5 use middlewares
```js
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()

// Middlewares
app.use(cors()) // Allows cross domain
app.use(morgan("dev")) // Show log terminal
app.use(express.json()) // For read json

// Routing

// Start Server
const PORT = 8000
app.listen(PORT,()=> console.log(`Server is runnig on port ${PORT}`))
```

## Step 6 create folder router & controllers [Register]
/controllers/auth-con.js
```js
exports.register = (req,res,next)=>{
    try{
        res.json({message:"hello register"})
    }catch(err){
        res.status(500).json({message:"Server Error!!!!!!!!!!!!!!!!!!!"})
        // next(err)
    }

}
```
/router/auth-router.js
```js
const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth-con")

// @ENDPOINT http://localhost:8000/api/register
authRouter.post('/register', authController.register )

// export
module.exports = authRouter
```

## Step 7 Create handle Error
/middlewares/error.js
```js
const handleError = (err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({message: err.message || "Something wrong"})
}

module.exports = handleError;
```
and change in try_catch
```js
exports.login = (req,res,next)=>{
    try {
        console.log(dfsdfsdfijjo)
        res.json({message:"hello login"})
    } catch (error) {
        next(error)
    }    
}
```

when update code in Github

```bash
git add .
git commit -m "message"
git push
```

|MEHTOD|ENDPOINT|BODY|
|-----|-----|-----|
POST|/api/register| email,password|


## Step 8 validate with zod

/middlewares/validators.js

```js

const { z } = require("zod");

//npm i zod
//TEST validator
exports.registerSchema = z.object({
    email: z.string().email("Email ไม่ถูกต้อง"),
    firstname: z.string().min(3, "Firstname ต้องมากกว่า 3 อักขระ"),
    lastname: z.string().min(3, "Lastname ต้องมากกว่า3อักขระ"),
    password: z.string().min(6, "Password ต้องมากกว่า 6 อักขระ"),
    confirmPassword: z.string().min(6, "Confirm Password ต้องมากกว่า 6 อักขระ")
}).refine((data) => data.password === data.confirmPassword,{
    message: "Confirm Password ไม่ตรงกัน",
    path:["confirmPassword"]
})

exports.loginSchema = z.object({
    email: z.string().email("Email ไม่ถูกต้อง"),
    password: z.string().min(6, "Password ต้องมากกว่า 6 อักขระ"),
})

exports.validateWithZod = (schema) => (req, res, next) => {
    try {
        console.log("Hello middleware");
        schema.parse(req.body);
        next();
    } catch (error) {
        const errMsg = error.errors.map((el) => el.message)
        const errTxt = errMsg.join(",")
        const mergeError = new Error(errTxt)
        next(mergeError);
    }
}


```

and then update code
/routes/auth-router.js

```js
const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth-con");
const { validateWithZod, registerSchema, loginSchema } = require("../middlewares.js/validator");


// @ENDPOINT http://localhost:8000/api/register
authRouter.post('/register', validateWithZod(registerSchema), authController.register );
authRouter.post('/login',validateWithZod(loginSchema), authController.login );

// export
module.exports = authRouter;
```
## Step 9 Prisma

```bash
npx prisma db push
```
# or
```bash
npx prisma migrate dev --name init
```

### Config prisma
/config/prisma.js
```js
const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = prisma
```
update code
Register
/controllers/auth-con.js
```js
const createError = require("../utils/create-error")
const prisma = require("../configs/prisma")
const bcrypt = require("bcryptjs")

exports.register = async (req,res,next)=>{
    try{
        // Step 1 req.body
        const {email, firstname , lastname ,password, confirmPassword} = req.body
        // Step 2 validate}
        // Step 3 Check already
        const checkEmail = await prisma.profile.findFirst({
            where:{
                email:email
            }
        })
        console.log(checkEmail)
        if(checkEmail){
            return checkEmail(400,"Email is already exits!!!")
        }
        // Step 4 Encrypt bcrypt
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password,salt)
        // console.log(hashedPassword)
        // Step 5 Insert to DB
        const profile = await prisma.profile.create({
            data:{
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: hashedPassword
            }
        })
        // Step 6 Response
        res.json({message:"Register Success"})
    }catch(error){
        console.log("Step 2 Catch")
        next(error)
    }

}

exports.login = (req,res,next)=>{
    try {
        console.log(dsgdsgfs)
        res.json({message:"hello login"})
    } catch (error) {
        console.log(error.message)
        next(error)
    }    
}

## Step 10 Login
/controllers/auth-con.js
```js
exports.login = async (req,res,next)=>{
    try {
        // Step 1 req.body
        const {email, password} = req.body
        // Step 2 Check email and password
        const profile = await prisma.profile.findFirst({
            where:{
                email:email
            }
        })
        if(!profile){
            return createError(400,"Email, Password is invalid!!!")
        }

        const isMatch = bcrypt.compareSync(password,profile.password)

        if(!isMatch){
            return createError(400,"Email, Password is invalid!!!")
        }
        // Step 3 Generate token
        const payload = {
            id:profile.id,
            email:profile.email,
            firstname:profile.firstname,
            lastname:profile.lastname,
            role: profile.role
        }
        const token = jwt.sign(payload,process.env.SECRET,{
            expiresIn:"1d"
        })

        // console.log(token)
        // Step 4 Response
        res.json({message:"Login Success",
            payload: payload,
            token: token
        })
    } catch (error) {
        console.log(error.message)
        next(error)
    }    
}
```

## Step 11 Current-user
/controllers/auth-con.js
```js
exports.currentUser = async(req,res,next)=>{
    try {
        res.json({message:"Hello, current user"})
    } catch (error) {
        next(error)
    }
}
```

## Step 12 Create file user-router.js in folder routes and Create file user-con.js in folder controllers
/routes/user-router.js
```js
const express = require('express')
const userRouter = express.Router()
const userController = require("../controllers/user-con")

// @ENDPOINT http://localhost:8000/api/user
userRouter.get('/user', userController.listUsers)
userRouter.patch('/user/update-role', userController.updateRole)
userRouter.delete('/user/:id', userController.deleteUser)

module.exports = userRouter
```
/controllers/user-con.js
```js
// 1.List all users
// 2.Update Role
// 3.Delete User

exports.listUsers = async(req,res,next)=>{
    try {
        res.json({message:"Hello, List Users"})
    } catch (error) {
        next(error)
    }
}

exports.updateRole = async(req,res,next)=>{
    try {
        res.json({message:"Hello, Update Role"})
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async(req,res,next)=>{
    try {
        res.json({message:"Hello, Delete Users"})
    } catch (error) {
        next(error)
    }
}
```