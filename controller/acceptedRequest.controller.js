const AcceptedRequest = require('../model/acceptedRequest.model');
const DeliveryRequest = require('../model/deliveryRequest.model');

// Controller function to handle the creation of an accepted request
const createAcceptedRequest = async (req, res, next) => {
    try {
        const requestId = req.params.requestId;
        const acceptingUserId = req.user.id; // Assuming you have user information in req.user

        // Check if the request with the given ID exists
        const existingRequest = await DeliveryRequest.findById(requestId);
        if (!existingRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Check if the request has already been accepted
        const existingAcceptedRequest = await AcceptedRequest.findOne({
            requestId,
            acceptingUserId,
        });
        if (existingAcceptedRequest) {
            return res.status(400).json({ message: 'Request already accepted' });
        }

        // Create a new accepted request
        const newAcceptedRequest = new AcceptedRequest({
            requestId,
            acceptingUserId,
        });

        await newAcceptedRequest.save();

        return res.status(201).json({ message: 'Request accepted successfully!' });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

// Controller function to handle the deletion of an accepted request
const deleteAcceptedRequest = async (req, res, next) => {
    try {
        const requestId = req.params.requestId;
        const acceptingUserId = req.user.id; // Assuming you have user information in req.user
        // Check if the accepted request with the given ID exists
        const existingAcceptedRequest = await AcceptedRequest.findOne({
            requestId,
            acceptingUserId,
        });
        console.log(existingAcceptedRequest)
        if (!existingAcceptedRequest) {
            return res.status(404).json({ message: 'Accepted request not found' });
        }

        // Delete the accepted request
        await existingAcceptedRequest.deleteOne()

        return res.status(200).json({ message: 'Accepted request deleted successfully!' });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
// Controller function to get all accepted requests
const getAllAcceptedRequests = async (req, res, next) => {
    try {
        const acceptingUserId = req.user.id; // Assuming you have user information in req.user

        // Get all accepted requests for the current user
        const acceptedRequests = await AcceptedRequest.find({ acceptingUserId });

        res.json({ acceptedRequests });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
module.exports = { createAcceptedRequest, deleteAcceptedRequest, getAllAcceptedRequests };
