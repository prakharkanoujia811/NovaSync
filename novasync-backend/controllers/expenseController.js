import Expense from '../models/Expense.js';
import Group from '../models/Group.js';
import { calculateMinTransactions } from '../utils/settlementLogic.js';

export const addExpenseAndSettle = async (req, res) => {
  try {
    const { description, amount, paidBy, groupId, splitType, splitDetails } = req.body;

    const newExpense = new Expense({
      description,
      amount,
      paidBy,
      groupId,
      splitType,
      splitDetails: splitDetails ? new Map(Object.entries(splitDetails)) : new Map()
    });
    await newExpense.save();

    const allExpenses = await Expense.find({ groupId });
    const group = await Group.findById(groupId);
    
    let balances = {};
    group.members.forEach(member => balances[member] = 0);

    allExpenses.forEach(exp => {
      const totalAmount = exp.amount;
      const payer = exp.paidBy;
      
      balances[payer] += totalAmount;

      if (exp.splitType === 'equal') {
        const share = totalAmount / group.members.length;
        group.members.forEach(m => balances[m] -= share);
      } 
      else if (exp.splitType === 'percentage') {
        group.members.forEach(m => {
          const percent = exp.splitDetails.get(m) || 0;
          balances[m] -= (totalAmount * (percent / 100));
        });
      } 
      else if (exp.splitType === 'value') {
        group.members.forEach(m => {
          const value = exp.splitDetails.get(m) || 0;
          balances[m] -= value;
        });
      }
    });

    const settlementSentences = calculateMinTransactions(balances);

    res.status(200).json({
      message: "Expense added",
      netBalances: balances, 
      instructions: settlementSentences 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExpensesByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const expenses = await Expense.find({ groupId }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSettlement = async (req, res) => {
  try {
    const { groupId } = req.params;
    const allExpenses = await Expense.find({ groupId });
    const group = await Group.findById(groupId);
    
    if (!group) return res.status(404).json({ message: "Group not found" });

    let balances = {};
    group.members.forEach(member => balances[member] = 0);

    allExpenses.forEach(exp => {
      const totalAmount = exp.amount;
      const payer = exp.paidBy;
      balances[payer] += totalAmount;

      if (exp.splitType === 'equal') {
        const share = totalAmount / group.members.length;
        group.members.forEach(m => balances[m] -= share);
      } 
      else if (exp.splitType === 'percentage') {
        group.members.forEach(m => {
          const percent = exp.splitDetails.get(m) || 0;
          balances[m] -= (totalAmount * (percent / 100));
        });
      } 
      else if (exp.splitType === 'value') {
        group.members.forEach(m => {
          const value = exp.splitDetails.get(m) || 0;
          balances[m] -= value;
        });
      }
    });

    const instructions = calculateMinTransactions(balances);
    res.status(200).json({ instructions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};