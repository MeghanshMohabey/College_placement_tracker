const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    roleOffered: { type: String, required: true },
    package: { type: String, required: true },
    eligibilityCGPA: { type: Number, required: true },
    deadline: { type: Date, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
