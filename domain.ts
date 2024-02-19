import Decimal from "decimal.js";
import {
  BankStatement,
  CreditorsBySpendingCategories,
  Expenses,
  Incomes,
  SpendingCategory,
} from "./types";

export const getExpenses = (bankStatement: BankStatement) =>
  bankStatement.filter((entry) => entry.amount.lessThan(0));

export const getIncomes = (bankStatement: BankStatement) =>
  bankStatement.filter((entry) => entry.amount.greaterThan(0));

export const createGetExpensesToCreditor =
  (bankStatement: BankStatement) => (creditor: string) => {
    const expensesFromCreditor = getExpenses(bankStatement).filter(
      (expense) =>
        expense.creditor.toLowerCase().includes(creditor.toLowerCase()) ||
        expense.reference.toLowerCase().includes(creditor.toLowerCase())
    );
    const totalExpenses = expensesFromCreditor.reduce(
      (total, expense) => total.plus(expense.amount),
      new Decimal(0)
    );
    return expensesFromCreditor.length !== 0
      ? { totalExpenses, expensesFromCreditor }
      : `creditor "${creditor}" not found in bank statement`;
  };

export const createGetIncomesFromDebtor =
  (bankStatement: BankStatement) => (debtor: string) => {
    const incomesFromDebtor = getIncomes(bankStatement).filter(
      (income) =>
        income.creditor.toLowerCase().includes(debtor.toLowerCase()) ||
        income.reference.toLowerCase().includes(debtor.toLowerCase())
    );
    const totalIncomes = incomesFromDebtor.reduce(
      (total, income) => total.plus(income.amount),
      new Decimal(0)
    );
    return incomesFromDebtor.length !== 0
      ? { totalIncomes, incomesFromDebtor }
      : `debtor "${debtor}" not found in bank statement`;
  };

export const getTotalExpenses = (expenses: Expenses) =>
  expenses.reduce((totalExpenses, expense) => {
    return totalExpenses.plus(expense.amount);
  }, new Decimal(0));

export const getTotalIncomes = (incomes: Incomes) =>
  incomes.reduce((totalIncomes, income) => {
    return totalIncomes.plus(income.amount);
  }, new Decimal(0));

export const createGetExpensesBySpendingCategories =
  (bankStatement: BankStatement) =>
  (creditorsBySpendingCategories: CreditorsBySpendingCategories) => {
    const expensesBySpendingCategories = Object.keys(
      creditorsBySpendingCategories
    ).reduce(
      (
        expensesBySpendingCategories: { [spendingCategory: string]: Decimal },
        category
      ) => {
        expensesBySpendingCategories[category] = new Decimal(0);
        return expensesBySpendingCategories;
      },
      {}
    );
    const missingEntries: { creditor: string; reference: string }[] = [];

    const expenses = getExpenses(bankStatement);
    let totalExpenses = new Decimal(0);
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
            expensesBySpendingCategories[spendingCategory] =
              expensesBySpendingCategories[spendingCategory].plus(
                expense.amount
              );
              totalExpenses = totalExpenses.plus(expense.amount)
          }
        });
      });
      if (!found) {
        missingEntries.push(expense);
      }
    });

    return { totalExpenses, expensesBySpendingCategories, missingEntries };
  };

export const getTotalBalanceChange = (bankStatement: BankStatement) =>
  bankStatement.reduce(
    (totalExpenses, expense) => totalExpenses.plus(expense.amount),
    new Decimal(0)
  );

// export const createGetExpensesByCreditorInSpendingCategory =
//   (creditorsBySpendingCategories: CreditorsBySpendingCategories) =>
//   (spendingCategory: SpendingCategory) => {
//     // get all expense entries of a category
//     const creditorsOfCategory = creditorsBySpendingCategories[spendingCategory];
//     const expensesByCreditorBySpendingCategory = null;
//     creditorsOfCategory.map(creditor => {})
//   };

/**
 * the creditor/debtor is sometimes indentified by the reference and not the creditor entry
 */
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
//
// export const getCreditorSet = (expenses: BankStatement) =>
//   Array.from(new Set(expenses.map((entry) => entry.creditor)));
//
// export const getDebtorSet = (incomes: BankStatement) =>
//   Array.from(new Set(incomes.map((income) => income.creditor)));
