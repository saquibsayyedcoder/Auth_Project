import express from "express";
import { register, login} from "../controller/auth.controller.js";
import protect from "../middleware/auth.middlleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected routes",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      password: req.user.password, // 🔐 hashed
    },
  });
});
export default router;
