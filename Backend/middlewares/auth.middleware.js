const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            console.error('No token provided');
            return res.status(401).json({ 
                message: 'User not authenticated',
                details: 'No authentication token provided' 
            });
        }

        const isBlacklisted = await blackListTokenModel.findOne({ token });
        if (isBlacklisted) {
            console.error('Token blacklisted');
            return res.status(401).json({ 
                message: 'User not authenticated',
                details: 'Token is no longer valid' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            console.error('User not found for token');
            return res.status(401).json({ 
                message: 'User not authenticated',
                details: 'User no longer exists' 
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        return res.status(401).json({ 
            message: 'User not authenticated',
            details: err.message 
        });
    }
};

module.exports.authCaptain = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                message: 'Authentication required',
                details: 'No token provided'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Find captain with both _id and active status
            const captain = await captainModel.findOne({
                _id: decoded._id,
                status: 'active'
            });

            if (!captain) {
                return res.status(401).json({ 
                    message: 'Authentication failed',
                    details: 'Captain not found or inactive'
                });
            }

            req.captain = captain;
            next();
        } catch (jwtError) {
            console.error('JWT verification error:', jwtError);
            return res.status(401).json({ 
                message: 'Authentication failed',
                details: 'Invalid token'
            });
        }
    } catch (err) {
        console.error('Auth middleware error:', err);
        return res.status(401).json({ 
            message: 'Authentication failed',
            details: err.message
        });
    }
};