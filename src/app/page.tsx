// src/app/page.tsx

'use client'; 

import { useState } from "react";
import { AddExpenseDialog } from '@/components/AddExpenseDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseTable } from "@/components/expenseTable"; // <--- Add this import

type Expense = {
  vendor: string;
  amount: number;
  date: string;
  category: string;
};

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const handleAddExpense = (newExpense: Expense) => {
    setExpenses((currentExpenses) => [...currentExpenses, newExpense]);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Spending Overview</CardTitle>
          <CardDescription>
            Track your monthly expenses wether it was cash or card transaction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            {expenses.length === 0 ? (
              <div className="flex flex-col items-center gap-4 p-4 text-center">
                <h2 className="text-xl">No expenses to display.</h2>
                <AddExpenseDialog onAddExpense={handleAddExpense} />
              </div>
            ) : (
              // The main content area
              <div className="w-full">
                <div className="flex justify-end p-4">
                  <AddExpenseDialog onAddExpense={handleAddExpense} />
                </div>
                <ExpenseTable expenses={expenses} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}