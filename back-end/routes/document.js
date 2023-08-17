import { Router } from "express";
import Document from "../models/Document.js";

const router = Router()

// /api/document/createdocument
router.get('/createdocument',async(req,res)=>{
    try {
        console.log('create document endpoint');
        const info = {
            owner: "parikshit",
            data:"this is the data"
        }
        const newDoc = await Document.create({
            owner: info.owner,
            data: info.data
        })
        res.status(200).send('get document')
    } catch (error) {
        console.log(error);
    }
})

export default router;