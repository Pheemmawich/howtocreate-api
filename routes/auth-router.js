const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth-con");
const { validateWithZod, registerSchema, loginSchema } = require("../middlewares.js/validator");


// @ENDPOINT http://localhost:8000/api/register
authRouter.post('/register', validateWithZod(registerSchema), authController.register );
authRouter.post('/login',validateWithZod(loginSchema), authController.login );

// export
module.exports = authRouter;