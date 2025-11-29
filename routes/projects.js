const express = require('express');
const router = express.Router();
const Project = require('../entities/Project');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const projects = await Project.find({ category: category });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', upload.single('thumbnail'), async (req, res) => {
    const { name, description, tags, category } = req.body;

    let thumbnail = null;

    if (req.file) {
        thumbnail = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

 const tagsArray = typeof tags === "string"
        ? tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
        : [];

    const newProject = new Project({
        name,
        description,
        tags: tagsArray,
        category,
        thumbnail
    });

    try {
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        await Project.deleteMany({});
        res.json({ message: 'All projects deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
