const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async(req,res)=>{
    try {
        const{name,email,password,branch,role}=req.body;
        let user=await User.findOne({email});
        if(user) {
            return res.status(400).json({msg:'User already exists'});
        }
        const hashedPassword =await bcrypt.hash(password,10);
        user= new User({
            name,
            email,
            password:hashedPassword,
            branch,
            role
        });

        await user.save();

        const token = jwt.sign(
            {
            id:user._id,
            role:user.role
            },
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
    
    
    );
    res.json({token});
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}



const login= async(req,res)=>{
         try {
            const {email,password}=req.body;
            const user =await User.findOne({email});
            if(!user){
                return res.status(400).json({msg:'Invalid credential'});
            }

           const isMatch = await bcrypt.compare(password,user.password);
           if(!isMatch){
             return res.status(401).json({msg:'Please Enter the Correct Password'});
           }
           
           const token = jwt.sign(
            {
            id:user._id,
            role:user.role
            },
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
    
    
    );
         res.json({token});

            
         } catch (error) {
            console.error(error);
            res.status(501).send('Server Error in login')
         }
}

module.exports = {register,login};