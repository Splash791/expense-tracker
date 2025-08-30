// src/app/api/expenses/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Expense from '@/models/Expense';

// GET handler to fetch all expenses
export async function GET() {
  await dbConnect();
  try {
    const expenses = await Expense.find({});
    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch expenses.' }, { status: 500 });
  }
}

// POST handler to save a new expense
export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const expense = await Expense.create(body);
    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create expense.' }, { status: 400 });
  }
}