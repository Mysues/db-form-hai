import express from 'express'
import {getCarManufacturerAll,getCarModel,getCarRegisterNumber,getCarID,createUserProfile} from './database.js'
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/car_manufacturer",async (req,res)=>{
    const manufacturer = await getCarManufacturerAll()
    
    res.send(manufacturer.map(car => car.manufacturer));
})

app.get("/car_model",async (req,res)=>{
    const manufacturer = req.query.manufacturer;
    const model = await getCarModel(manufacturer)
    
    res.send(model.map(car => car.model));
})

app.get("/registration_number",async (req,res)=>{
    const car_manufacturer = req.query.car_manufacturer;
    const car_model = req.query.car_model;
    const registration_number = await getCarRegisterNumber(car_manufacturer,car_model)
    
    res.send(registration_number.map(car => car.register_number));
})

app.get("/car_id",async (req,res)=>{
    const car_manufacturer = req.query.car_manufacturer;
    const car_model = req.query.car_model;
    const registration_number = req.query.registration_number;
    const car_id = await getCarID(car_manufacturer,car_model,registration_number)
    
    res.send(car_id[0]);
})

app.post("/create_user",async (req,res)=>{
    const userProfile = await req.body;
    createUserProfile(userProfile);
    res.send(userProfile);
})

app.listen(8080,()=>{
    console.log("Server is running");
})