export async function createUserProfile(pool,userProfile){
    
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

export async function checkUserProfile(pool,userIC){
    const [rows] = await pool.query(`
    SELECT user_id 
    FROM user_rental 
    WHERE ic = ?
    `,[userIC]);
    return rows; // change user to user_rental
}

export async function getUserProfile(pool){
    const [rows] = await pool.query(`
    SELECT DISTINCT
    name,
    phone
    FROM user_rental
    `
    )
    return rows
} // acui add function