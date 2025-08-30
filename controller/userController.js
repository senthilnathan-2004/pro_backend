const User = require("../model/usermodel");
const { sendMail } = require("../middleware/sendMail");

const contact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (message.length < 5) {
      return res
        .status(400)
        .json({ error: "Message must be at least 5 characters long" });
    }

    // Save to database
    const newUser = new User({ name, email, message });
    await newUser.save();

    // Send mail to user
    await sendMail(name, email, message);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { contact };
