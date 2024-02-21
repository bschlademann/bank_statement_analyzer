import Decimal from "decimal.js";
import {
  BankStatement,
  CreditorsBySpendingCategories,
  Expenses,
  Incomes,
  MissingEntries,
  SpendingCategory,
} from "./types";
import { creditorsBySpendingCategories } from "./creditorsBySpendingCategories";

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

export const createIsSpendingCategory = (creditorsBySpendingCategories: CreditorsBySpendingCategories) => (key: any): key is SpendingCategory => {
  return Object.keys(creditorsBySpendingCategories).includes(key);
};

export const isSpendingCategory = createIsSpendingCategory(creditorsBySpendingCategories);

export const createGetExpensesBySpendingCategories =
  (bankStatement: BankStatement) =>
  (creditorsBySpendingCategories: CreditorsBySpendingCategories) => {
    const spendingCategories: SpendingCategory[] = Object.keys(
      creditorsBySpendingCategories
    ).filter(isSpendingCategory);

    const expensesBySpendingCategories = spendingCategories.reduce(
      (
        expensesBySpendingCategories: { [spendingCategory: string]: Decimal },
        category
      ) => {
        expensesBySpendingCategories[category] = new Decimal(0);
        return expensesBySpendingCategories;
      },
      {}
    );

    const expenses = getExpenses(bankStatement);
    let totalExpenses = new Decimal(0);
    const missingEntries: MissingEntries = [];

    expenses.forEach((expense) => {
      let found = false;
      spendingCategories.forEach((spendingCategory) => {
        const creditorList = creditorsBySpendingCategories[spendingCategory];

        creditorList.forEach((creditorFromList) => {
          const creditorFound =
            expense.creditor
              .toLowerCase()
              .includes(creditorFromList.toLowerCase()) ||
            expense.reference
              .toLowerCase()
              .includes(creditorFromList.toLowerCase());

          if (creditorFound) {
            found = true;
            expensesBySpendingCategories[spendingCategory] =
              expensesBySpendingCategories[spendingCategory].plus(
                expense.amount
              );
            totalExpenses = totalExpenses.plus(expense.amount);
          }
        });
      });

      if (!found) {
        missingEntries.push(expense);
      }
    });

    // {
    //   expensesBySpendingCategories: {
    //     totalExpenses: -180,
    //     expensesBySpendingCategories: { food: -80, travel: -100 },
    //     missingEntries: []
    //   }
    // }

    // {
    //   expensesBySpendingCategories: {
    //     totalExpenses: -180,
    //     expensesBySpendingCategories: { food: {value: -80, percentile: 0.44}, travel:{value: -100, percentile: 0.56 } },
    //     missingEntries: []
    //   }
    // }

    // type DetailedExpensesBySpendingCategories = {
    //   [key in SpendingCategory]: { value: Decimal; percentile: Decimal };
    // };

    // const detailedExpensesBySpendingCategories: DetailedExpensesBySpendingCategories =
    //   spendingCategories.reduce((acc, category) => {
    //     const amount = expensesBySpendingCategories[category];
    //     const percentile = totalExpenses.isZero()
    //       ? new Decimal(0)
    //       : amount.dividedBy(totalExpenses).abs();
    //     acc[category] = { value: amount, percentile: percentile.toNumber() };
    //     return acc;
    //   }, {});

    // const addPercentile = (expensesBySpendingCategories) => {};

    return {
      expensesBySpendingCategories: {
        totalExpenses,
        expensesBySpendingCategories,
        missingEntries,
      },
    };
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
