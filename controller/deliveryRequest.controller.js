const DeliveryRequest = require('../model/deliveryRequest.model');
const NotificationRequest = require('../model/notification.model')
const User = require('../model/user.model');

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
      itemPickupLatitude,
      itemPickupLongitude,
      itemDestinationLatitude,
      itemDestinationLongitude,
      itemTips,
      itemNotes
    } = req.body;
    console.log(req.body)
    const itemImage = req.file ? 'uploads/' + req.file.filename : '';
    const userId = req.user.id;

    if (id) {
      // If id is present, update the existing request
      const existingRequest = await DeliveryRequest.findById(id);

      if (!existingRequest) {
        return res.status(404).json({ message: 'Request not found' });
      }

      // Check if each field has a value and update only those that are present
      if (itemName) existingRequest.itemName = itemName;
      if (itemWeight) existingRequest.itemWeight = itemWeight;
      if (itemSize) existingRequest.itemSize = itemSize;
      if (itemDestination) existingRequest.itemDestination.name = itemDestination;
      if (itemPickup) existingRequest.itemPickup.name = itemPickup;
      if (itemPickupLatitude) existingRequest.itemPickup.latitude = itemPickupLatitude;
      if (itemPickupLongitude) existingRequest.itemPickup.longitude = itemPickupLongitude;
      if (itemDestinationLatitude) existingRequest.itemDestination.latitude = itemDestinationLatitude;
      if (itemDestinationLongitude) existingRequest.itemDestination.longitude = itemDestinationLongitude;
      if (itemTips) existingRequest.itemTips = itemTips;
      if (itemNotes) existingRequest.itemNotes = itemNotes;
      if (itemImage) existingRequest.itemImage = itemImage;

      await existingRequest.save();

      return res.status(200).json({ message: 'Request updated successfully!' });
    } else {
      // If id is not present, create a new request
      const newDeliveryRequest = new DeliveryRequest({
        itemName,
        itemWeight,
        itemSize,
        itemDestination: {
          name: itemDestination,
          latitude: itemDestinationLatitude,
          longitude: itemDestinationLongitude
        },
        itemPickup: {
          name: itemPickup,
          latitude: itemPickupLatitude,
          longitude: itemPickupLongitude
        },
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

// Rest of your controllers remain the same...

// Rest of your code...

// Controller function to get all delivery requests excluding those posted by the current user
const getAllRequests = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const requests = await DeliveryRequest.find({ status: 'pending' });
    res.json({ requests });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Rest of your code...

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

const updateDeliveryStatus = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const acceptingUserId = req.user.id; // Assuming you have user information in req.user
    const loggedUserDetails = await User.findById(acceptingUserId)
    // Validate if the request ID is provided
    if (!requestId) {
      return res.status(400).json({ message: 'Request ID is required for Updation' });
    }

    const changeStatusRequest = await DeliveryRequest.findById(requestId);
    // Check if the request was found and deleted
    if (!changeStatusRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    changeStatusRequest.status = 'delivered'
    changeStatusRequest.save()
    const newNotificationRequest = new NotificationRequest({
      title: 'Request Delivered',
      message: `Your delivery for item ${changeStatusRequest.itemName} is marked delivered by ${loggedUserDetails.firstname} ${loggedUserDetails.lastname}`,
      url: '',
      userId: changeStatusRequest.userId
    })
    await newNotificationRequest.save();
    return res.status(200).json({ message: 'Request Updated Status successfully' });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// Rest of your code...

module.exports = { submitRequest, getAllRequests, getAllRequestsByUserId, deleteRequestById, updateDeliveryStatus };
