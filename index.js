const express = require("express")
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes")
const {noteRouter} = require("./routes/note.routes")
const {authenticate} = require("./middleware/authenticate.middleware")
const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home PAGE")
})

app.use("/users",userRouter)

app.use(authenticate)

app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(err){
        console.log({"msg":"Something went wrong","error":err.message})
    }
    console.log(`Server is running at ${process.env.post}`)

})
