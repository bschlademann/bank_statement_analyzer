import Decimal from "decimal.js";
import {
  BankStatement,
  CreditorsBySpendingCategories,
  Expenses,
  ExpensesBySpendingCategories,
  ExpensesWithPercentage,
  Incomes,
  MissingEntries,
  SpendingCategory,
} from "./types";

export const getCreditorsBySpendingCategories = () => {
  let creditorsBySpendingCategories;
  try {
    // Try to load the private module
    creditorsBySpendingCategories =
      require("./myPrivateCreditorsBySpendingCategories").creditorsBySpendingCategories;
  } catch (error) {
    // If it fails, fall back to the public module
    creditorsBySpendingCategories =
      require("./creditorsBySpendingCategories").creditorsBySpendingCategories;
  }
  return creditorsBySpendingCategories;
};

export const creditorsBySpendingCategories = getCreditorsBySpendingCategories();

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

export const createIsSpendingCategory =
  (creditorsBySpendingCategories: CreditorsBySpendingCategories) =>
  (key: any): key is SpendingCategory => {
    return Object.keys(creditorsBySpendingCategories).includes(key);
  };

export const isSpendingCategory = createIsSpendingCategory(
  creditorsBySpendingCategories
);

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
        // FIXME: add ChatGPT catch: if (expense.amount === -20.79 && creditor === "PayPal (Europe) S.a r.l. et Cie, S.C.A.") add amout to key chatGpt
        missingEntries.push(expense);
        totalExpenses = totalExpenses.plus(expense.amount);
      }
    });

    const removeEmptyCategories = (
      expensesWithPercentage: ExpensesWithPercentage
    ): ExpensesWithPercentage => {
      return expensesWithPercentage.filter((expense) =>
        Object.values(expense).some(
          (spendingCategory) => !spendingCategory.value.isZero()
        )
      );
    };

    const addExpensePercentage = (
      spendingCategories: SpendingCategory[],
      expensesBySpendingCategories: ExpensesBySpendingCategories
    ) => {
      return spendingCategories.map((category) => {
        const value = expensesBySpendingCategories[category];
        const totalExpenses = getTotalExpenses(expenses);
        const expensePercentage = value.div(totalExpenses).toDecimalPlaces(2);
        return { [category]: { value, expensePercentage } };
      });
    };

    const expensesWithPercentage = addExpensePercentage(
      spendingCategories,
      expensesBySpendingCategories
    );

    return {
      totalExpenses,
      expensesWithPercentage: removeEmptyCategories(expensesWithPercentage),
      missingEntries,
    };
  };

export const getTotalBalanceChange = (bankStatement: BankStatement) =>
  bankStatement.reduce(
    (totalExpenses, expense) => totalExpenses.plus(expense.amount),
    new Decimal(0)
  );

// FIXME: add getMonthlyAveragePerYear
export const getMonthlyAveragePerYear = (expensesBySpendingCategories: {
  totalExpenses: Decimal;
  expensesWithPercentage: ExpensesWithPercentage;
  missingEntries: MissingEntries;
}) => {
  const { expensesWithPercentage } =
    expensesBySpendingCategories;

  //   ExpensesWithPercentage = {
  //     [speendingCategory: string]: {
  //         value: Decimal;
  //         expensePercentage: Decimal;
  //     };
  //   }[]

  return {

    expensesWithPercentage: expensesWithPercentage,

  };
};
