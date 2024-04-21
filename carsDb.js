export async function getCarManufacturerAll(pool){
    const [rows] = await pool.query(`
    SELECT DISTINCT manufacturer
    FROM car_rental
    `
    )
    return rows
}

export async function getCarModel(pool,manufacturer){
    const [rows] = await pool.query(`
    SELECT DISTINCT model 
    FROM car_rental 
    WHERE manufacturer = ?
    `,[manufacturer])
    return rows
}

export async function getCarRegisterNumber(pool,manufacturer,model){
    const [rows] = await pool.query(`
    SELECT register_number 
    FROM car_rental 
    WHERE manufacturer = ?
    AND model = ?
    `,[manufacturer,model])
    return rows
}

export async function getCarID(pool,manufacturer,model,registerNumber){
    const [rows] = await pool.query(`
    SELECT car_id 
    FROM car_rental 
    WHERE manufacturer = ?
    AND model = ?
    AND register_number = ?
    `,[manufacturer,model,registerNumber])
    return rows
}