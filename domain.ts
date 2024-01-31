import creditorsBySpendingCategories from "./creditorsBySpendingCategories";
import { bankStatement } from "./parseCsvToBankStatement";
import {
  BankStatement,
  CreditorsBySpendingCategories,
  ExpensesByCreditor,
} from "./types";

export const expenses = bankStatement.filter((entry) => entry.amount < 0);

export const incomes = bankStatement.filter((entry) => entry.amount > 0);

export const getCreditorSet = (expenses: BankStatement) =>
  Array.from(new Set(expenses.map((entry) => entry.creditor)));

export const getDebtorSet = (incomes: BankStatement) =>
  Array.from(new Set(incomes.map((income) => income.creditor)));

export const getExpensesFromCreditor = (creditor: string) => {
  return expenses.filter((expense) =>
    expense.creditor.toLowerCase().includes(creditor.toLowerCase())
  );
};

// export const getIncomesFromDebtor = (debtor: string) => {
//   return incomes.filter((income) =>
//     income.creditor.toLowerCase().includes(debtor.toLowerCase())
//   );
// };

export const getExpensesBySpendingCategories = (
  creditorsBySpendingCategories: CreditorsBySpendingCategories
) => {
  const expensesBySpendingCategories = Object.keys(
    creditorsBySpendingCategories
  ).reduce(
    (
      expensesBySpendingCategories: { [spendingCategory: string]: number },
      category
    ) => {
      expensesBySpendingCategories[category] = 0;
      return expensesBySpendingCategories;
    },
    {}
  );
  const missingEntries: { creditor: string; reference: string }[] = [];

  expenses.forEach((expense) => {
    let found = false;
    const spendingCategories = Object.keys(creditorsBySpendingCategories);
    spendingCategories.forEach((spendingCategory) => {
      const creditorList = creditorsBySpendingCategories[spendingCategory];
      creditorList.forEach((creditorFromList) => {
        if (
          expense.creditor
            .toLowerCase()
            .includes(creditorFromList.toLowerCase()) ||
          expense.reference
            .toLowerCase()
            .includes(creditorFromList.toLowerCase())
        ) {
          found = true;
          expensesBySpendingCategories[spendingCategory] += expense.amount;
        }
      });
    });
    if (!found) {
      missingEntries.push(expense);
    }
  });

  return { expensesBySpendingCategories, missingEntries };
};

// export const getAllExpensesByCreditors = (): ExpensesByCreditor => {
//   const expensesByCreditor: ExpensesByCreditor = {};
//   expenses.forEach((expense) => {
//     const { amount, creditor, reference } = expense;
//     if (!expensesByCreditor[creditor]) {
//       expensesByCreditor[creditor] = {
//         totalAmount: amount,
//         // references: [reference],
//       };
//     } else {
//       expensesByCreditor[creditor].totalAmount += amount;
//       //   expensesByCreditor[creditor].references.push(reference);
//     }
//   });
//   return expensesByCreditor;
// };

export const getTotalExpenses = () =>
  expenses.reduce((totalExpenses, expense) => {
    return totalExpenses + expense.amount;
  }, 0);
