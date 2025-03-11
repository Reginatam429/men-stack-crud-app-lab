const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// INDEX - Show all tasks
router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.render("index", { tasks });
});

// NEW - Show form to create new task
router.get("/new", (req, res) => {
    res.render("new");
});

// CREATE - Add new task to DB
router.post("/", async (req, res) => {
    await Task.create(req.body);
    res.redirect("/tasks");
});

// SHOW - Show a single task
router.get("/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render("show", { task });
});

// EDIT - Show edit form
router.get("/:id/edit", async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render("edit", { task });
});

// UPDATE - Update a specific task
router.put("/:id", async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/tasks");
});

// DELETE - Delete a task
router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/tasks");
});

module.exports = router;
