import express from 'express';
import { addExpenseAndSettle, getSettlement, getExpensesByGroup, deleteExpense } from '../controllers/expenseController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',protect, addExpenseAndSettle);
router.get('/:groupId',protect, getExpensesByGroup);
router.delete('/:id',protect, deleteExpense);
router.get('/:groupId/settle', protect, getSettlement);

export default router;