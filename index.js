import express from 'express'
import {getCarVendorAll} from './database.js'

const app = express();

app.get("/vendors",async (req,res)=>{
    const data = await getCarVendorAll()
    
    res.send(data);
})

app.listen(8080,()=>{
    console.log("Server is running");
})