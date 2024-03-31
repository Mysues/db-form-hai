import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getCarVendorAll(){
    const [rows] = await pool.query(`
    SELECT DISTINCT vendor
    FROM cars
    `
    )
    return rows
}

export async function getCarModel(vendor){
    const [rows] = await pool.query(`
    SELECT DISTINCT model 
    FROM cars 
    WHERE vendor = ?
    `,[vendor])
    return rows
}

export async function getCarRegisterNumber(vendor,model){
    const [rows] = await pool.query(`
    SELECT register_number 
    FROM cars 
    WHERE vendor = ?
    AND model = ?
    `,[vendor,model])
    return rows
}

export async function getCarID(vendor,model,registerNumber){
    const [rows] = await pool.query(`
    SELECT car_id 
    FROM cars 
    WHERE vendor = ?
    AND model = ?
    AND register_number = ?
    `,[vendor,model,registerNumber])
    return rows
}


