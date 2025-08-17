'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddExpenseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Add New Expense</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Enter the details for your new expense.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Form will go here */}
          <p>This is where the expense form will be.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}