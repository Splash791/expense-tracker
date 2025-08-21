'use client';

import { ReactNode } from 'react';
import { AddExpenseDialog } from '@/components/addExpenseDialog';
import { DashboardFilters } from '@/components/DashboardFilters';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type DashboardLayoutProps = {
  children: ReactNode;
  onAddExpense: (newExpense: any) => void;
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
};

export function DashboardLayout({ children, onAddExpense, selectedDate, onDateChange }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 p-6 sm:p-8">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-blue-600">Expense Eye</h1>
          <div className="flex items-center space-x-2">
            <Switch id="compare-mode" />
            <Label htmlFor="compare-mode" className="text-sm text-gray-600">
              Compare
            </Label>
          </div>
        </div>
        <AddExpenseDialog onAddExpense={onAddExpense} />
      </header>

      <main className="mt-8 flex-1">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:justify-start">
          <DashboardFilters selectedDate={selectedDate} onDateChange={onDateChange} />
          <div className="flex gap-2">
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {children}
        </div>
      </main>
    </div>
  );
}