const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
dotenv.config();

const contactRoute = require("./route/user");
const connectDB = require("./database/connectDB");

const app = express();
app.set("trust proxy", 1);  
//cors configuration
const corsOptions = {
  origin:["https://senra.run.place/","https://senthilnathan-2004.github.io/","http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
};

//middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

//rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Too many requests, please try again later.",
});

//routes
app.use("/api", limiter, contactRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
  connectDB();
});
