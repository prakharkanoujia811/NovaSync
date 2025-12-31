import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    description: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    paidBy: { 
        type: String, 
        required: true 
    },
    groupId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Group' 
    },
    splitType: { 
        type: String, 
        enum: ['equal', 'value', 'percentage'] 
    },
    splitDetails: { 
        type: Map,
        of: Number 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model('Expense',expenseSchema);