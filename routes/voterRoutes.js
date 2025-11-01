import express from 'express';
import multer from 'multer';
import upload from '../middleware/upload.js';
import {
  uploadExcel,
  getAllVoters,
  getVoterById,
  deleteAllVoters,
} from '../controllers/voterController.js';

const router = express.Router();

// POST /api/voters/upload - Upload Excel and insert rows with explicit multer error handling
router.post(
  '/upload',
  (req, res, next) => {
    const uploadSingle = upload.single('file');
    uploadSingle(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: `Multer error: ${err.message}`, error: err.code });
      } else if (err) {
        return res.status(400).json({ success: false, message: err.message || 'File upload error' });
      }
      next();
    });
  },
  uploadExcel
);

// GET /api/voters - List all voters
router.get('/', getAllVoters);

// GET /api/voters/:id - Get one voter by ID
router.get('/:id', getVoterById);

// DELETE /api/voters - Delete all voters
router.delete('/', deleteAllVoters);

export default router;
