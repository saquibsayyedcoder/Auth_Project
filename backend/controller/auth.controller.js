import User from "../model/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Resgister 
export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message:"User already exist"});
        }
       const hashedPassword = await bcrypt.hash(password, 10);

await User.create({
  name,
  email,
  password: hashedPassword,
});


        const user = await User.create({
            name, 
            email,
            password: hashedPassword,

        });

        res.status(201).json({message:"User registration successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}

//LOgin

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

    const user = await User.findOne({ email }).select("+password");

        if(!user){
            return res.status(400).json({message:"Invalid credential"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credential"});
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN}
        );
        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
        });
        
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}