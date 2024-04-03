import express from "express"
import { addUrl, deleteToken, getShortUrl } from "../controller/url.controller.js";

const router = express.Router();

router.post('/url',addUrl);
router.get('/url/:shortUrlID',getShortUrl)
router.delete('/url/del',deleteToken);

export default router;