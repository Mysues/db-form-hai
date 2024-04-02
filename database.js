import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getCarManufacturerAll(){
    const [rows] = await pool.query(`
    SELECT DISTINCT manufacturer
    FROM cars
    `
    )
    return rows
}

export async function getCarModel(manufacturer){
    const [rows] = await pool.query(`
    SELECT DISTINCT model 
    FROM cars 
    WHERE manufacturer = ?
    `,[manufacturer])
    return rows
}

export async function getCarRegisterNumber(manufacturer,model){
    const [rows] = await pool.query(`
    SELECT register_number 
    FROM cars 
    WHERE manufacturer = ?
    AND model = ?
    `,[manufacturer,model])
    return rows
}

export async function getCarID(manufacturer,model,registerNumber){
    const [rows] = await pool.query(`
    SELECT car_id 
    FROM cars 
    WHERE manufacturer = ?
    AND model = ?
    AND register_number = ?
    `,[manufacturer,model,registerNumber])
    return rows
}


