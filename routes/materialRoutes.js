const express= require('express');
const multer=require('multer');
const {uploadMaterial,getMaterials}=require('../controllers/materialController');
const authMiddleware=require('../middleware/authMiddleware')
const router=express.Router();

const upload = multer({dest:'uploads/'})  // stores in uploads folder

router.post('/upload',authMiddleware,upload.single('file'),uploadMaterial);
router.get('/',getMaterials);

module.exports=router;

