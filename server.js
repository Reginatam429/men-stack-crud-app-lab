const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const app = express();

// Middleware
app.set("view engine", "ejs");  // Set EJS as template engine
app.use(express.urlencoded({ extended: true }));  // Body parser
app.use(methodOverride("_method"));  
app.use("/tasks", taskRoutes);

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected to Student Cluster"))
    .catch(err => console.log(err));


// Home Route
app.get("/", (req, res) => {
    res.render("home");
});

// Task Routes
app.use("/tasks", taskRoutes);


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
