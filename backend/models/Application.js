const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    status: { type: String, enum: ['Applied', 'Shortlisted', 'Rejected', 'Selected'], default: 'Applied' },
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
