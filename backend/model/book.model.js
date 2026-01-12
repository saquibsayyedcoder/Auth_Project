import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        author:{
            type: String,
            required: true,
        },
        description:{
            type: String,
        },
        price:{
            type: Number,
            required: true,
        },
        image:{
            type: String,
        },
        stock:{
            type: Number,
            required: true,
            default: 1,
        },
    },
    { timestamps: true}
);

export default mongoose.model('Book', bookSchema);