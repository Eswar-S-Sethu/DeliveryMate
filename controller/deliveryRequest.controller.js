const DeliveryRequest = require('../model/deliveryRequest.model');

// Controller function to handle the submission of a delivery request
const submitRequest = async (req, res, next) => {
  try {
    const {
      id, // Check for the presence of id
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

    if (id) {
      // If id is present, update the existing request
      const existingRequest = await DeliveryRequest.findById(id);

      if (!existingRequest) {
        return res.status(404).json({ message: 'Request not found' });
      }

      existingRequest.itemName = itemName;
      existingRequest.itemWeight = itemWeight;
      existingRequest.itemSize = itemSize;
      existingRequest.itemDestination = itemDestination;
      existingRequest.itemPickup = itemPickup;
      existingRequest.itemTips = itemTips;
      existingRequest.itemNotes = itemNotes;
      existingRequest.itemImage = itemImage;

      await existingRequest.save();

      return res.status(200).json({ message: 'Request updated successfully!' });
    } else {
      // If id is not present, create a new request
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
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
const getAllRequests = async (req, res, next) => {
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
    const userId = req.user.id; // Assuming you are passing the userId as a parameter
    const requests = await DeliveryRequest.find({ userId });
    res.json({ requests });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Controller function to handle the deletion of a delivery request by ID
const deleteRequestById = async (req, res, next) => {
  try {
    const requestId = req.params.id;

    // Validate if the request ID is provided
    if (!requestId) {
      return res.status(400).json({ message: 'Request ID is required for deletion' });
    }

    // Find and delete the request
    const deletedRequest = await DeliveryRequest.findByIdAndDelete(requestId);

    // Check if the request was found and deleted
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    return res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
module.exports = { submitRequest, getAllRequests, getAllRequestsByUserId, deleteRequestById };
