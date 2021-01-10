//requirements
const passport = require("passport");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//Route Configurations
const usersRouter = require("./routes/api/users");
const billsRouter = require("./routes/api/bills");
const expensesRouter = require("./routes/api/expenses");
const incomeRouter = require("./routes/api/income");

//Port configurations
const port = process.env.PORT || 5000; //port for running server

//Middleware Configurations
app.use(cors());
app.use(express.json()); //allows for JSON parsing

//MongoDB Connection configuration
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  //will log once we are connected to database
  console.log("MongoDB database connection established successfully.");
});

// Passport middleware configuration
app.use(passport.initialize());

// Passport configuration
require("./config/passport")(passport);

// Routes
app.use("/api/users", usersRouter);
app.use("/api/bills", billsRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/income", incomeRouter);

//Port deployment
app.listen(port, () => console.log(`Server running on port ${port}`));