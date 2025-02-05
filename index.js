const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
// Routing
const authRouter = require("./routes/auth-router")
const handleError = require("./middlewares.js/error")

const app = express()

// Middlewares
app.use(cors()) // Allows cross domain
app.use(morgan("dev")) // Show log terminal
app.use(express.json()) // For read json

// Routing 
app.use('/api',authRouter)

// Handle errors
app.use(handleError)

// Start Server
const PORT = 8000
app.listen(PORT,()=> console.log(`Server is runnig on port ${PORT}`))