import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name :{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password: {
      type: String,
      required: true,
      select: true, // later we can make it false
    },
    },
    {timestamps:true}
);

export default mongoose.model("User", userSchema);