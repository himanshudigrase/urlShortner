import express from "express"
import { addUrl, getShortUrl } from "../controller/url.controller.js";

const router = express.Router();

router.post('/url',addUrl);
router.get('/url/:shortUrlID',getShortUrl)

export default router;