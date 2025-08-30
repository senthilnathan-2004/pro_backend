const express = require("express");
const route = express.Router();

// Import modules
const { validate } = require("../middleware/validate");
const { contact } = require("../controller/userController");
const aiAssistant = require("../controller/chatController");

// Define routes
route.post("/contact", validate, contact);
route.post("/chat", aiAssistant);

module.exports = route;
