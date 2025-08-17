// src/app/page.tsx
'use client'; 

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseTable } from "@/components/expenseTable";
import { DashboardLayout } from "@/components/DashboardLayout"; 
type Expense = {
  vendor: string;
  amount: number;
  date: string;
  category: string;
};

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses((currentExpenses) => [...currentExpenses, newExpense]);
  };

  const filteredExpenses = useMemo(() => {
    if (!selectedDate) {
      return expenses;
    }
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getFullYear() === selectedDate.getFullYear() &&
        expenseDate.getMonth() === selectedDate.getMonth()
      );
    });
  }, [expenses, selectedDate]);

  return (
    <DashboardLayout 
      onAddExpense={handleAddExpense} 
      selectedDate={selectedDate} 
      onDateChange={setSelectedDate}
    >
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Expenses</CardTitle>
            <CardDescription>A list of your recent expenses.</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredExpenses.length === 0 ? (
              <div className="flex flex-col items-center gap-4 p-4 text-center">
                <p>No results found.</p>
              </div>
            ) : (
              <ExpenseTable expenses={filteredExpenses} />
            )}
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Your spending at a glance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4 p-4">
                <p>Total Expenses</p>
                <h2 className="text-3xl font-bold">$0.00</h2>
                <h3 className="mt-4 font-semibold">Spending by Category</h3>
                <p className="text-center text-sm text-muted-foreground">
                    No expense data available. Add an expense or adjust filters.
                </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}