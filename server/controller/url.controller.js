import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Url } from "../models/url.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getTokenRange, hashGenerator, range, removeToken } from "../utils/zookeper.js";

const addUrl = asyncHandler(async(req,res) =>{
    if(range.curr < range.end - 1){
        range.curr++;
    }
    else{
         getTokenRange();
        range.curr++;
    }
    console.log("Range curr is -----",range.curr)
    console.log("Long URL received from client",req.body);
    const longUrl = req.body.longUrl;

    if(!longUrl){
        throw new ApiError(404,"LongUrl is empty");
    }
    const urlAlreadyExists = await Url.findOne({
        redirectionURL: req.body.longUrl
    })
    if(urlAlreadyExists){
        res.status(200)
        .json(new ApiResponse(200,urlAlreadyExists.updatedAt.shortURL,"Short URL already existed."));

    }
    // need to add middleware to create a B62 hash for
    // counter 
    const shortUrl = hashGenerator(range.curr-1);
    console.log(shortUrl);
    const url = await Url.create({
        redirectionURL: req.body.longUrl,
        shortURL: shortUrl,
        visitHistory:1
    });

    if(!url){
        throw new ApiError(400, "Unable to save short URL")
    }

    await url.save();

    return res.status(200)
    .json(new ApiResponse(200,url.shortURL,"Short URL created successfully"));

});


const getShortUrl = asyncHandler(async(req,res) =>{
    const shortUrl = req.params.shortUrlID;

    if(!shortUrl){
        throw new ApiError(404,"Incorrect short URL");
    }

    const urlEntry =await Url.findOne({shortURL:shortUrl});

    if(!urlEntry){
        throw new ApiError(404,"No corresponding long URL found");
    }
    //console.log(urlEntry.redirectionURL)
    return res.redirect(urlEntry.redirectionURL);
});

const deleteToken = asyncHandler(async(req, res) =>{
    removeToken();
})

export {addUrl, getShortUrl, deleteToken}