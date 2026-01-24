import Note from "../model/Note.js";

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"});
    }
}

export const getNotesById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) res.status(404).json({message: "Note not found"})
        res.status(200).json(note)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"});
    }
}

export const createNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const note = new Note({title, content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateNotes = async (req, res) => {
    try {
        const {title, content} = req.body;
        const updatedNotes = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
        if(!updatedNotes) {
            res.status(404).json({message: "Note not found"})
        }
        res.status(200).json(updatedNotes);;
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const deletedNode = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNode) return res.status(404).json({ message: "Note not found" })
        res.status(200).json({message: "Note deleted successfully!"});
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"});
    }
}