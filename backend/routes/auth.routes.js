import express from "express";
import { register, login} from "../controller/auth.controller.js";
import protect from "../middleware/auth.middlleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, (req, res) => {
    res.json({
        message:"Protected routes", user:req.user
    });
})
export default router;
