const noteModel = require("../models/noteModel");

const insertNote = async (req, res) => {

    const {title, description} = req.body;

    const newNote = new noteModel({
        userId : req.userId,
        title : title,
        description : description
    });

    try {
        
        await newNote.save();
        res.status(201).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Sometnig went wrong"});
    }
}

const updateNote = async (req, res) => {
    const id = req.params.id;
    const {title, description} = req.body;

    const newNote = {
        userId : req.userId,
        title : title,
        description : description
    }

    try {
        await noteModel.findByIdAndUpdate(id, newNote, {new : true});
        res.status(200).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Sometnig went wrong"});
    }
}

const deleteNote = async (req, res) => {
    const id = req.params.id;

    try {
        const note = await noteModel.findByIdAndRemove(id);
        res.status(202).json(note); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Sometnig went wrong"});
    }
}

const getNotes = async (req, res) => {
    
    try {
        const notes = await noteModel.find({userId : req.userId});
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Sometnig went wrong"});
    }
}

module.exports = {
    insertNote,
    updateNote,
    deleteNote,
    getNotes
}