const { body, validationResult } = require("express-validator");

// Contact form validation rules
const validate = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("message")
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 5 })
    .withMessage("Message must be at least 5 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validate };
