import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from "./routes/book.routes.js";
import cors from 'cors';


dotenv.config();
connectDB();
const app = express();
app.use(cors());

const corsOptions = [
    'http://localhost:5173',
    process.env.CORS_ORIGIN,
   
];
app.use(cors({
  origin: corsOptions,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes );
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});