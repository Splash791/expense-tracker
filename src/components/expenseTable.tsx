// src/components/ExpenseTable.tsx

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Expense = {
  vendor: string;
  amount: number;
  date: string;
  category: string;
};

type ExpenseTableProps = {
  expenses: Expense[];
};

export function ExpenseTable({ expenses }: ExpenseTableProps) {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{expense.date}</TableCell>
              <TableCell>{expense.vendor}</TableCell>
              <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
              <TableCell>{expense.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}