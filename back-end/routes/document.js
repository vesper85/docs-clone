import { Router } from "express";
// import Document from "../models/Document.js";
import {Document, User} from '../models/index.js'
import crypto from 'node:crypto'
import fetchuser from "../middleware/fetchuser.js";

const router = Router()

// /api/document/fetchdocument
router.get('/fetchdocument',async(req,res)=>{
    try {
        const docid = req.header('doc_id')
        console.log(docid);
        const doc = await Document.findOne({where:{doc_id:docid}})
        res.status(200).send(doc)
    } catch (error) {
        console.log(error);
    }
})


// /api/document/createdocument
router.post('/createdocument',fetchuser,async(req,res)=>{
    try {
        const data = req.body
        const userEmail = req.user.id;
        let newDocId = crypto.randomBytes(5).toString('hex')
        const newDoc = await Document.create({...data,"doc_id":newDocId,"UserEmail":userEmail});

        const user = await User.findOne({where:{email:userEmail}})
        const test = await user.getDocuments();
        res.status(200).send(newDoc)
    } catch (error) {
        console.log(error);
    }
})


// /api/document/fetchdocuments
router.get('/fetchdocuments',fetchuser,async(req,res)=>{
    try {
        const userEmail = req.user.id;
        const user = await User.findOne({where:{email:userEmail}})
        const allDocs = await user.getDocuments();
        return res.status(200).send(allDocs);
    } catch (error) {
        console.log(error);
    }
})


// get the unique doc id -> verify if the document belongs to the user or not -> update the document
router.put('/updatedocument/:docid',fetchuser,async(req,res)=>{
    try {
        let docid = req.params.docid;
        let doc = await Document.findOne({where:{doc_id:docid}});
        // ++add check if doc doesnot exists
        if(!doc){
            return res.status(400).send('bad request, document does not exist')
        }else{
            // add check for each param (title, data)
            const {title, data} = req.body;
            doc.title = title;
            doc.data = data;
            await doc.save();
            return res.status(200).send("Document update successfull")
        }
    } catch (error) {
        console.log(error);
    }
})

router.delete("/deletedocument/:docid",async(req,res)=>{
    try {
        let docid = req.params.docid;
        let doc = await Document.findOne({where:{doc_id:docid}})
        if(!doc){
            return res.status(400).send('bad request, document does not exist')
        }else{
            await doc.destroy({force:true})
            return res.status(200).send('document deleted')
        }
    } catch (error) {
        console.log(error);
    }
})

export default router;