const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// INDEX - Show all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render("index", { tasks }); // Looks for "views/index.ejs"
    } catch (err) {
        res.status(500).send("Error fetching tasks");
    }
});

// NEW - Show form to create a new task
router.get("/new", (req, res) => {
    res.render("new"); // Looks for "views/new.ejs"
});

// SHOW - Show one task
router.get("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.render("show", { task }); // Looks for "views/show.ejs"
    } catch (err) {
        res.status(404).send("Task not found");
    }
});

// EDIT - Show edit form
router.get("/:id/edit", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.render("edit", { task }); // Looks for "views/edit.ejs"
    } catch (err) {
        res.status(404).send("Task not found");
    }
});

// CREATE - Add new task to DB
router.post("/", async (req, res) => {
    try {
        await Task.create(req.body);
        res.redirect("/tasks");
    } catch (err) {
        res.status(500).send("Error creating task");
    }
});

// UPDATE - Update a specific task
router.put("/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: "Error updating task" });
    }
});

// DELETE - Delete a task
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect("/tasks");
    } catch (err) {
        res.status(500).send("Error deleting task");
    }
});

module.exports = router;
