'use client';
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; 
import { Trash2 } from "lucide-react";

type Expense = {
  _id: string; 
  vendor: string;
  amount: number;
  date: string;
  category: string;
};

type ExpenseTableProps = {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void; 
};

export function ExpenseTable({ expenses, onDeleteExpense }: ExpenseTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Date</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead> 
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell className="font-medium">{expense.date}</TableCell>
              <TableCell>{expense.vendor}</TableCell>
              <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onDeleteExpense(expense._id)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}