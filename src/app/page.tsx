import { AddExpenseDialog } from "@/components/ui/addExpenseDialog";
import {Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Spending Overview</CardTitle>
          <CardDescription>
            Track your monthly expenses wether it was cash or card transaction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl text-center">No expenses to display.</h2>
            <AddExpenseDialog />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
