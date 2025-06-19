const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');


module.exports.createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { pickup, destination, vehicleType } = req.body;

        if (!pickup || !destination || !vehicleType) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Get coordinates first to validate the address
        let pickupCoordinates;
        try {
            pickupCoordinates = await mapService.getAddressCoordinate(pickup);
            if (!pickupCoordinates) {
                return res.status(400).json({ message: 'Invalid pickup location' });
            }
        } catch (err) {
            console.error('Geocoding error:', err);
            return res.status(400).json({ message: 'Failed to validate pickup location' });
        }

        // Get nearby captains
        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoordinates.ltd, 
            pickupCoordinates.lng, 
            100 // Increased radius to 100km for testing
        );

        console.log('Found captains:', captainsInRadius.length);

        if (!captainsInRadius.length) {
            console.log('No active captains found in radius');
            return res.status(404).json({ message: 'No drivers available' });
        }

        // Create the ride
        let ride = await rideService.createRide({ 
            user: req.user._id, 
            pickup, 
            destination, 
            vehicleType 
        });

        // Populate user details
        const rideWithUser = await rideModel.findOne({ _id: ride._id })
            .populate('user')
            .lean();

        console.log('Found captains:', captainsInRadius.length);

        // Notify available captains
        let notifiedCaptains = 0;
        for (const captain of captainsInRadius) {
            if (captain.socketId) {
                try {
                    console.log(`Notifying captain ${captain._id} with socket ${captain.socketId}`);
                    await sendMessageToSocketId(captain.socketId, {
                        event: 'new-ride',
                        data: rideWithUser
                    });
                    notifiedCaptains++;
                } catch (err) {
                    console.error(`Failed to notify captain ${captain._id}:`, err);
                }
            } else {
                console.log(`Captain ${captain._id} has no socket ID`);
            }
        }

        console.log(`Notified ${notifiedCaptains} captains`);
        
        return res.status(201).json({
            ...ride.toObject(),
            notifiedCaptains
        });

    } catch (err) {
        console.error('Create ride error:', err);
        return res.status(500).json({ 
            message: 'Error creating ride', 
            error: err.message 
        });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { rideId } = req.body;
        if (!rideId) {
            return res.status(400).json({ message: 'Ride ID is required' });
        }

        const captain = req.captain;
        if (!captain) {
            return res.status(401).json({ message: 'Captain not authenticated' });
        }

        const ride = await rideService.confirmRide({ rideId, captain });

        if (ride.user?.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-confirmed',
                data: ride
            });
        }

        return res.status(200).json(ride);
    } catch (err) {
        console.error('Confirm ride error:', err);
        return res.status(500).json({ 
            message: 'Error confirming ride',
            error: err.message 
        });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}