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

export async function createUserProfile(userProfile){
    
    var name = userProfile.name;
    var ic = userProfile.ic;
    var phone = userProfile.phone;
    var address_line1 = userProfile.address_line1;
    var address_line2 = userProfile.address_line2;
    var city = userProfile.city;
    var state = userProfile.state;
    var zipcode = userProfile.zipcode;
    var country = userProfile.country;
    var ic_img_dir = userProfile.ic_img_dir;

    const [rows] = await pool.query(`
    INSERT INTO 
    \`contract-form\`.users 
    (
        name,
        ic, 
        phone,
        address_line1,
        address_line2,
        city,
        state,
        zipcode,
        country,
        ic_img_dir
    ) 
    VALUES 
    (
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?
    )
    `,
    [
        name,
        ic, 
        phone,
        address_line1,
        address_line2,
        city,
        state,
        zipcode,
        country,
        ic_img_dir
    ]);

    return rows
}