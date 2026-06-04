import express from "express";
import Task from "../models/Task.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.use(auth);

router.get("/", async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = { userId: req.user.id };
    if (status === "pending" || status === "completed") {
      filter.status = status;
    }
    if (search && search.trim()) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Failed to load tasks" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body || {};
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    const safeStatus = status === "completed" ? "completed" : "pending";
    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      status: safeStatus,
      userId: req.user.id
    });
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create task" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body || {};
    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    const update = {};
    if (title !== undefined) update.title = title.trim();
    if (description !== undefined) update.description = description.trim();
    if (status === "pending" || status === "completed") update.status = status;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      update,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update task" });
  }
});

router.patch("/:id/toggle", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.status = task.status === "completed" ? "pending" : "completed";
    await task.save();
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Failed to toggle task" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.json({ message: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete task" });
  }
});

export default router;
