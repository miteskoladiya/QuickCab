const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ fullname, email, password, color, plate, capacity, vehicleType }) => {
    if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const captain = captainModel.create({
        fullname,
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}