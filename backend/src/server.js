import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

// middleware
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json())

app.use(rateLimiter) // rate limiter middleware

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server started on PORT: 5001");
    });
});
