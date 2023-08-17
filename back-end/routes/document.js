import { Router } from "express";

const router = Router()

// /api/document/createdocument
router.get('/createdocument',async(req,res)=>{
    try {
        console.log('create document endpoint');
        res.status(200).send('get document')
    } catch (error) {
        console.log(error);
    }
})

export default router;