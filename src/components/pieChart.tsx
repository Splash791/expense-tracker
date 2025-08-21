'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

type Expense = {
  vendor: string;
  amount: number;
  date: string;
  category: string;
};

type SpendingPieChartProps = {
  expenses: Expense[];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

// A utility function to transform our expense data for the pie chart
const getChartData = (expenses: Expense[]) => {
  const categoryTotals: { [key: string]: number } = {};

  expenses.forEach(expense => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  return Object.keys(categoryTotals).map(category => ({
    name: category,
    value: categoryTotals[category],
  }));
};

export function SpendingPieChart({ expenses }: SpendingPieChartProps) {
  const data = getChartData(expenses);

  return (
    <div className="w-full h-64">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-sm text-muted-foreground mt-8">
          No expense data available. Add an expense or adjust filters.
        </p>
      )}
    </div>
  );
}