import express from 'express';
import { getGroups, createGroup, deleteGroup } from '../controllers/groupController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getGroups);
router.post('/', protect, createGroup);
router.delete('/:id', protect, deleteGroup);

export default router;