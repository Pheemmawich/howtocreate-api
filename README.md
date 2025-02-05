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
git remote add origin https://github.com/Teepakorn-Sangiamsak/test-project-api.git
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