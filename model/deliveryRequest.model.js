const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliveryRequestSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemWeight: {
        type: String,
        required: true,
    },
    itemSize: {
        type: String,
        required: true,
    },
    itemDestination: {
        type: String,
        required: true,
    },
    itemPickup: {
        type: String,
        required: true,
    },
    itemTips: {
        type: String,
        required: true,
    },
    itemNotes: {
        type: String,
        required: true,
    },
    itemImage: {
        type: String,
        required: true,
    },
    submissionTime: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

const DeliveryRequest = mongoose.model('DeliveryRequest', deliveryRequestSchema);

module.exports = DeliveryRequest;
