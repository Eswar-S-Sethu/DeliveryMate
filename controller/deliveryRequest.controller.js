const DeliveryRequest = require('../model/deliveryRequest.model');

// Controller function to handle the submission of a delivery request
const submitRequest = async (req, res, next) => {
    try {
        const {
            itemName,
            itemWeight,
            itemSize,
            itemDestination,
            itemPickup,
            itemTips,
            itemNotes
        } = req.body;

        const itemImage = req.file ? 'uploads/' + req.file.filename : '';
        const userId = req.user.id;

        const newDeliveryRequest = new DeliveryRequest({
            itemName,
            itemWeight,
            itemSize,
            itemDestination,
            itemPickup,
            itemTips,
            itemNotes,
            itemImage,
            userId
        });

        await newDeliveryRequest.save();

        return res.status(201).json({ message: 'Request submitted successfully!' });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
getAllRequests = async (req, res,next) => {
    try {
      const requests = await DeliveryRequest.find();
      res.json({ requests });
    } catch (error) {
      console.error(error);
      next(error)
    }
  };
  // Controller function to get all delivery requests by user ID
const getAllRequestsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Assuming you are passing the userId as a parameter
    const requests = await DeliveryRequest.find({ userId });
    res.json({ requests });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
module.exports = { submitRequest,getAllRequests,getAllRequestsByUserId };
