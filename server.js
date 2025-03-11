const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.static("public")); 
app.set("view engine", "ejs"); 
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Import Routes 
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected to Student Cluster"))
    .catch(err => console.log(err));

// Redirect homepage to tasks list
app.get("/", (req, res) => {
    res.redirect("/tasks");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
