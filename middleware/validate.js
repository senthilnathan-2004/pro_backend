const { body, validationResult } = require("express-validator");

// Contact form validation rules
const validate = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("subject")
    .notEmpty()
    .withMessage("subject is required"),

  body("message")
    .notEmpty()
    .withMessage("Message is required"),


  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validate };
