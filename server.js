const express = require('express');
const cors= require('cors');
const {Server}=require('socket.io');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());


connectDB();    //connected to mongoDB

const authRoutes=require('./routes/authRoutes');          //import route
const materialRoutes=require('./routes/materialRoutes');
const chatRoutes=require('./routes/chatRoutes');



app.use('/api/auth',authRoutes);            // routes
app.use('/api/materials',materialRoutes);
app.use('/api/chat',chatRoutes);


//setup socketio for for realtime chat

const http=require('http').createServer(app);
const io = new Server(http,{cors:{origin:'*'}});

io.on('connection',socket =>{
    console.log('A user connected');

    socket.on('message',(message)=>{
        io.emit('message',message);
    });
    socket.on('disconnect',()=>{
        console.log('A user disconnected');
    })
})

const PORT = 3000;
http.listen(PORT,()=>{
   console.log(`Server running at ${PORT}`)
})
