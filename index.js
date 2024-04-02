import express from 'express'
import {getCarManufacturerAll} from './database.js'

const app = express();

app.get("/manufacturer",async (req,res)=>{
    const data = await getCarManufacturerAll()
    
    res.send(data.map(car => car.manufacturer));
})

app.listen(8080,()=>{
    console.log("Server is running");
})