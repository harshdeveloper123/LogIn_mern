const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors')

const { MONGO_URL, PORT } = process.env;
//eshtablish connection with database through mongoose
mongoose.connect(MONGO_URL)
.then(()=>console.log("mongodb is successfully connected"))
.catch((e)=>console.error(e));


app.listen(PORT,()=>{
     console.log(`server is running on port ${PORT}`)
})

app.use(
    cors({
        origin:["https://localhost:4000"],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    })
);

app.use(express.json());