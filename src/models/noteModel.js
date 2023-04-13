const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
}, {timestamps : true});

module.exports = mongoose.model("Note", NoteSchema);