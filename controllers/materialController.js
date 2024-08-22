const Material = require('../models/Material');

const uploadMaterial =async(req,res)=>{
    try {
        const {branch,subject}=req.body;
        const fileUrl=req.file.path; //multer stores the file
        
        const material = new Material({
            branch,
            subject,
            fileUrl,
            uploadedBy:req.user.id
        })
        await material.save();
        res.status(201).json(material);



    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
}



const getMaterials= async(req,res)=>{
    try {
        const{branch}=req.query;
        const materials= await Material.find({branch});
        res.json(materials);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
        
    }
}

module.exports={uploadMaterial,getMaterials};