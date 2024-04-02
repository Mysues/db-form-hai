import express from 'express'
import {getCarManufacturerAll,getCarModel} from './database.js'

const app = express();

app.get("/car_manufacturer",async (req,res)=>{
    const manufacturer = await getCarManufacturerAll()
    
    res.send(manufacturer.map(car => car.manufacturer));
})

app.get("/car_model",async (req,res)=>{
    const manufacturer = req.query.manufacturer;
    const model = await getCarModel(manufacturer)
    
    res.send(model.map(car => car.model));
})

app.listen(8080,()=>{
    console.log("Server is running");
})