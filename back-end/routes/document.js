import { Router } from "express";
import Document from "../models/Document.js";

const router = Router()

// /api/document/createdocument
router.get('/fetchdocument',async(req,res)=>{
    try {
        // Document.findOne({
        //     where:{req.header('title')}
        // })
        res.status(200).send('get document')
    } catch (error) {
        console.log(error);
    }
})


router.post('/createdocument',async(req,res)=>{
    try {
        const data = req.body
        await Document.create({...data});
        res.status(200).send('Document created')
    } catch (error) {
        console.log(error);
    }
})

export default router;