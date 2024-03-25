import express from "express";
import cors from "cors";
import router from "./routes/url.route.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORGIN,
    credentials: true
}));

app.use(express.json({limit:"16kb"}));

app.use(express.static("public"));

app.use("/api/v1",router)
export {app};
