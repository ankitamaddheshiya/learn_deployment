const express = require("express");
const { noteModel } = require("../model/notes.model");


const noteRouter = express.Router()

noteRouter.use(express.json());

noteRouter.get("/",async(req,res)=>{
    const notes = await noteModel.find()
    res.send(notes)
})

noteRouter.post("/create",async(req,res)=>{
    const payload = req.body
    const note = new noteModel(payload)
   await note.save()
   res.send({"msg":"Notes Created"})

})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteID = req.params.id
    await noteModel.findByIdAndDelete({_id:noteID})
   
    res.send({"msg":`Notes with id ${noteID}has been deleted`})
})

module.exports = {
     noteRouter
}