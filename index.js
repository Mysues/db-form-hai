import express from 'express'
import * as db from './database.js'
import bodyParser from 'body-parser';

import cors from 'cors'

// const {
//     getCarManufacturerAll,
//     getCarModel,
//     getCarRegisterNumber,
//     getCarID,
//     createUserProfile
// } = db; //acui comment

const app = express();

// Enable CORS for all routes
//app.use(cors()); 

app.use(cors({
    origin: 'http://127.0.0.1:5500' // Allow requests from this origin only
})); // acui add

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/car_manufacturer",async (req,res)=>{
    const manufacturer = await db.getCarManufacturerAll()
    
    res.send(manufacturer.map(car => car.manufacturer));
})

app.get("/car_model",async (req,res)=>{
    const manufacturer = req.query.manufacturer;
    const model = await db.getCarModel(manufacturer)
    
    res.send(model.map(car => car.model));
})

app.get("/registration_number",async (req,res)=>{
    const car_manufacturer = req.query.car_manufacturer;
    const car_model = req.query.car_model;
    const registration_number = await db.getCarRegisterNumber(car_manufacturer,car_model)
    
    res.send(registration_number.map(car => car.register_number));
})

app.get("/car_id",async (req,res)=>{
    const car_manufacturer = req.query.car_manufacturer;
    const car_model = req.query.car_model;
    const registration_number = req.query.registration_number;
    const car_id = await db.getCarID(car_manufacturer,car_model,registration_number)
    
    res.send(car_id[0]);
})

app.post("/create_user",async (req,res)=>{
    const userProfile = await req.body;
    db.createUserProfile(userProfile);
    res.send(userProfile);
})

app.post("/check_user",async (req,res)=>{
    const userIc = req.body.ic;
    const userId = await db.checkUserProfile(userIc);

    res.send(userId[0]);
})

app.listen(8080,()=>{
    console.log("Server is running");
})