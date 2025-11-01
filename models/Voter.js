import mongoose from 'mongoose';

// Flexible schema to accept any columns coming from Excel
const VoterSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

export default mongoose.model('Voter', VoterSchema);