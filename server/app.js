import express from "express";
import cors from "cors";
import router from "./routes/url.route.js";

const app = express();

app.use(cors({
    origin:  process.env.CORS_ORGIN,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type','accept']
}));
// app.use(cors());
app.use(express.json({limit:"16kb"}));

app.use(express.static("public"));

app.use("/api/v1",router)
export {app};
