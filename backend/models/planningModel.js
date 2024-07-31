import mongoose from "mongoose";

const planningSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
        },
        collabId:{
            type: mongoose.Schema.Types.ObjectId, ref: 'Collab', required: true
        },
        date:{
            type: Date,
            required: true,
        },
        status:{
            type: String,
            enum:['scheduled','completed','failed']
        },
        notes:{
            type: String
        }
    }
);

const Planning= mongoose.model('Planning',planningSchema);

export default Planning