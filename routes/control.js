const express = require('express');
const mongoose = require('mongoose');
const Control = require('../models/control');

const router = express.Router();

// GET /controls - list all controls or filter by app_name via query ?app_name=...
router.get('/', async (req, res) => {
    try {
        const { app_name } = req.query;
        const filter = app_name ? { app_name } : {};
        const controls = await Control.find(filter);
        res.status(200).json(controls);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch controls', details: err.message });
    }
});

// GET /controls/app/:app_name - get one control by app_name
router.get('/app/:app_name', async (req, res) => {
    try {
        const { app_name } = req.params;
        if (!app_name) return res.status(400).json({ error: 'app_name required' });

        const control = await Control.findOne({ app_name });
        if (!control) return res.status(404).json({ error: 'Control not found' });

        res.status(200).json(control);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch control', details: err.message });
    }
});

// GET /controls/:id - get one control by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });

        const control = await Control.findById(id);
        if (!control) return res.status(404).json({ error: 'Control not found' });

        res.status(200).json(control);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch control', details: err.message });
    }
});

// POST /controls - create a new control
router.post('/', async (req, res) => {
    try {
        const payload = req.body;
        if (!payload || Object.keys(payload).length === 0) {
            return res.status(400).json({ error: 'Request body required' });
        }

        const control = new Control(payload);
        await control.save();
        res.status(201).json(control);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create control', details: err.message });
    }
});

// PUT /controls/:id - update an existing control
router.put('/:app_name', async (req, res) => {
    try {
        const { app_name } = req.params;
        const updates = req.body;
        if (!mongoose.Types.ObjectId.isValid(app_name)) return res.status(400).json({ error: 'Invalid id' });

        const control = await Control.updateOne({ app_name: app_name }, { $set: updates }, { new: true });
        if (!control) return res.status(404).json({ error: 'Control not found' });

        res.status(200).json(control);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update control', details: err.message });
    }
});

// DELETE /controls/:id - remove a control
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });

        const control = await Control.findByIdAndDelete(id);
        if (!control) return res.status(404).json({ error: 'Control not found' });

        res.status(200).json({ message: 'Control deleted', id: control._id });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete control', details: err.message });
    }
});

module.exports = router;