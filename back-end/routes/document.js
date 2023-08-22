import { Router } from "express";
import Document from "../models/Document.js";
import crypto from 'node:crypto'
import fetchuser from "../middleware/fetchuser.js";
import User from "../models/User.js";

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


router.post('/createdocument',fetchuser,async(req,res)=>{
    try {
        const data = req.body
        const userId = req.user.id;
        let newDocId = crypto.randomBytes(5).toString('hex')
        
        const newDoc = await Document.create({...data,"doc_id":newDocId});

        const user = await User.findOne({where:{email:userId}})
        // const newUser = await User.update({doc_ids:newDocId},{where:{email:userId}})
        // console.log(newUser);
        res.status(200).send(newDoc)
    } catch (error) {
        console.log(error);
    }
})

export default router;