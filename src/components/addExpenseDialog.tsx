'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from "react"; 
import { ReceiptScanner } from '@/components/receiptScanner';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  vendor: z.string().min(2, { message: "Vendor must be at least 2 characters." }),
  amount: z.coerce.number().min(0.01, { message: "Amount must be a positive number." }),
  date: z.string().date({ message: "Invalid date format." }),
  category: z.string().min(1, { message: "Please select a category." }),
});

const expenseCategories = [
  'Food',
  'Transportation',
  'Shopping',
  'Utilities',
  'Entertainment',
  'Health',
  'Others',
];

type AddExpenseDialogProps = {
  onAddExpense: (newExpense: any) => void;
};

export function AddExpenseDialog({ onAddExpense }: AddExpenseDialogProps) {
  const [open, setOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendor: "",
      amount: 0,
      date: new Date().toISOString().substring(0, 10),
      category: "",
    },
  });

  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const newExpense = await response.json();
      onAddExpense(newExpense); 
      form.reset();
      setOpen(false);
    } else {
      console.error('Failed to add expense');
    }
  }

  const handleSwitchToScanner = () => {
    setIsScanning(true);
  };

  const handleSwitchToManual = () => {
    setIsScanning(false);
  };
  
  const handleScanComplete = (parsedData: any) => {
    form.reset({
      vendor: parsedData.vendor || '',
      amount: parsedData.amount || 0,
      date: parsedData.date || new Date().toISOString().substring(0, 10),
      category: "",
    });

    setIsScanning(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Expense</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            {isScanning ? "Scan your receipt to automatically fill the form." : "Enter the details for your new expense."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center space-x-2 my-2">
          <Button 
            variant={isScanning ? "secondary" : "default"}
            onClick={handleSwitchToManual}
            className="flex-1"
          >
            Manual Entry
          </Button>
          <Button 
            variant={isScanning ? "default" : "secondary"}
            onClick={handleSwitchToScanner}
            className="flex-1"
          >
            Scan Receipt
          </Button>
        </div>

        {isScanning ? (
          <ReceiptScanner onScanComplete={handleScanComplete} />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="vendor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor</FormLabel>
                    <FormControl>
                      <Input placeholder="Starbucks, Groceries, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25.50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {expenseCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add Expense</Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}