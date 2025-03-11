const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
dotenv.config();

const app = express();


// Routes
app.get("/", (req, res) => {
    res.render("home");
});

// Test Route
app.get("/test", (req, res) => {
    res.send("Server is running!");
});

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);


// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Middleware
app.set("view engine", "ejs");  // Set EJS as template engine
app.use(express.urlencoded({ extended: true }));  // Body parser
app.use(methodOverride("_method"));  




// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
