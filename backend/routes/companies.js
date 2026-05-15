const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const { protect, admin } = require('../middleware/auth');

// Get all companies (Public/Student/Admin)
router.get('/', protect, async (req, res) => {
    try {
        const companies = await Company.find().sort({ createdAt: -1 });
        res.json(companies);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Add a company (Admin only)
router.post('/', protect, admin, async (req, res) => {
    try {
        const company = await Company.create(req.body);
        res.status(201).json(company);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update a company (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!company) return res.status(404).json({ message: 'Company not found' });
        res.json(company);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Delete a company (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) return res.status(404).json({ message: 'Company not found' });
        res.json({ message: 'Company removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
