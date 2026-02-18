import express from "express";
import connectDB from "./config/db.js";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { corsOptions } from "./config/settings.js";

const app = express();

// Data Base
connectDB();

app.set("trust proxy", 1);

// Third-party Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));

// Built-in Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Middlewares
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// Error-Handing Middlewares
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "حدث خطأ!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
