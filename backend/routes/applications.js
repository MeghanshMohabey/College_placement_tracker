const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { protect, admin } = require('../middleware/auth');

// Get all applications (Admin) or my applications (Student)
router.get('/', protect, async (req, res) => {
    try {
        let applications;
        if (req.user.role === 'admin') {
            applications = await Application.find().populate('studentId', 'name email cgpa').populate('companyId');
        } else {
            applications = await Application.find({ studentId: req.user._id }).populate('companyId');
        }
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Apply for a company (Student)
router.post('/', protect, async (req, res) => {
    try {
        const { companyId } = req.body;
        
        if (req.user.role !== 'student') return res.status(403).json({ message: 'Only students can apply' });

        const existingApp = await Application.findOne({ studentId: req.user._id, companyId });
        if (existingApp) return res.status(400).json({ message: 'Already applied for this company' });

        const application = await Application.create({
            studentId: req.user._id,
            companyId
        });

        res.status(201).json(application);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update application status (Admin)
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
        
        if (!application) return res.status(404).json({ message: 'Application not found' });
        
        res.json(application);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
