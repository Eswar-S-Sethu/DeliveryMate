const express = require('express');
const router = express.Router();
const { createAcceptedRequest, deleteAcceptedRequest } = require('../controller/acceptedRequest.controller');

// Create an accepted request
router.post('/:requestId', createAcceptedRequest);

// Delete an accepted request
router.delete('/:requestId', deleteAcceptedRequest);

module.exports = router;
