// src/models/Expense.ts

import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  vendor: {
    type: String,
    required: [true, 'Please provide a vendor name.'],
  },
  amount: {
    type: Number,
    required: [true, 'Please provide an amount.'],
  },
  date: {
    type: String,
    required: [true, 'Please provide a date.'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category.'],
  },
}, { timestamps: true });

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);