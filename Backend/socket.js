const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            try {
                const { userId, userType } = data;
                console.log(`${userType} joining:`, userId);

                if (userType === 'captain') {
                    const captain = await captainModel.findByIdAndUpdate(
                        userId,
                        { socketId: socket.id },
                        { new: true }
                    );
                    console.log(`Captain ${userId} socket updated:`, captain.socketId);
                } else if (userType === 'user') {
                    const user = await userModel.findByIdAndUpdate(
                        userId,
                        { socketId: socket.id },
                        { new: true }
                    );
                    console.log(`User ${userId} socket updated:`, user.socketId);
                }
            } catch (error) {
                console.error('Error in join event:', error);
            }
        });

        socket.on('disconnect', async () => {
            console.log(`Client disconnected: ${socket.id}`);
            // Clear socket ID from both user and captain collections
            await userModel.updateMany(
                { socketId: socket.id },
                { $unset: { socketId: 1 } }
            );
            await captainModel.updateMany(
                { socketId: socket.id },
                { $unset: { socketId: 1 } }
            );
        });
    });
}

const sendMessageToSocketId = async (socketId, messageObject) => {
    try {
        console.log(`Sending ${messageObject.event} to socket ${socketId}:`, messageObject.data);
        
        if (!io) {
            throw new Error('Socket.io not initialized');
        }
        
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } catch (error) {
        console.error('Error sending socket message:', error);
        throw error;
    }
};

module.exports = { initializeSocket, sendMessageToSocketId };