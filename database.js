import mysql from 'mysql2';
import dotenv from 'dotenv';
import * as userDb from './usersDb.js'
import * as carDb from './carsDb.js'

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export function getCarManufacturerAll(){
    return carDb.getCarManufacturerAll(pool);
}

export function getCarModel(manufacturer){
    return carDb.getCarModel(pool,manufacturer);
}

export function getCarRegisterNumber(manufacturer,model){
    return carDb.getCarRegisterNumber(pool,manufacturer,model);
}

export function getCarID(manufacturer,model,registerNumber){
    return carDb.getCarID(pool,manufacturer,model,registerNumber);
}

export function createUserProfile(userProfile){
    return userDb.createUserProfile(pool,userProfile);
}