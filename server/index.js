    const express = require('express');
    const app = express();
    const mongoose = require('mongoose');
    require("dotenv").config();
    const cors = require('cors')
    const {MONGO_URL,PORT} = process.env;
    const authRoute = require('./routes/AuthRoute');
    const cookieParser = require('cookie-parser');


    //eshtablish connection with database through mongoose
    mongoose.connect(MONGO_URL)
    .then(()=>console.log("mongodb is successfully connected"))
    .catch((e)=>console.error(e));

    mongoose.connection.once('open',()=>{
        console.log("Connected to Db:",mongoose.connection.name)
    })

      app.use(cors({
     origin: 'http://localhost:5173', 
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization']
   }));
    app.use(cookieParser());

    app.use(express.json());
    app.use('/',authRoute);

    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })

   