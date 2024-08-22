const Chat = require('../models/Message');

const sendMessage=async(req,res)=>{
   const {content}=req.body;

   try {
      const chatMessage= new Chat({
        sender:req.user.id,
        content,
        timestamp
        
      })

      await chatMessage.save();
      res.status(500).json({msg:'Message Sent Successfully'});
    
   } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
   }
}

module.exports=sendMessage;

const getMessages =async(req,res)=>{
 try {
   const {content} =req.query;

   const messages=await Chat.find({content});

   res.status(200).json(messages);
   
 } catch (error) {
   console.error(error);
   res.status(401).json({msg:'Error in Sendig Message'});  
 }
}

module.exports=getMessages;