
import { log, table } from "console";
import creditorsBySpendingCategories from "./creditorsBySpendingCategories";
import { getExpensesBySpendingCategories } from "./domain";
// import { parseCommaToFloat } from "./lib";
// import { getCreditorSet, getDebtorSet, getExpensesFromCreditor, getIncomesFromDebtor, getExpensesBySpendingCategories, getTotalExpenses, getAllExpensesByCreditors, formatBankStatementEntries, getExpenses, getIncomes, getBankStatement } from "./domain";
// import { hasEntry } from "./lib";


// const filterExpenses = (bankStatement: BankStatement) => {
//   const incomes: BankStatement = bankStatement.filter(
//     (entry) => entry.Betrag > 0
//   );
//   const expenses: BankStatement = bankStatement.filter(
//     (entry) => entry.Betrag < 0
//   );

//   const formatedIncome = incomes.map((income) => {
//     return {
//       Betrag: income.Betrag,
//       Zahlungspflichtiger: income["Beguenstigter/Zahlungspflichtiger"],
//       Verwendungszweck: income.Verwendungszweck,
//     };
//   });

//   const formatedExpenses = expenses.map((expense) => {
//     return {
//       Betrag: expense.Betrag,
//       Beguenstigter: expense["Beguenstigter/Zahlungspflichtiger"],
//       Verwendungszweck: expense.Verwendungszweck,
//     };
//   });

//   const getCreditorSet = (expenses: BankStatement) => {
//     return new Set(
//       expenses.map((expense) => expense["Beguenstigter/Zahlungspflichtiger"])
//     );
//   };

//   const getExpensesByCreditor = (creditor: string) => {
//     return expenses
//       .filter((expense) =>
//         expense["Beguenstigter/Zahlungspflichtiger"].includes(creditor)
//       )
//       .map((expense) => {
//         return {
//           Betrag: expense.Betrag,
//           Verwendungszweck: expense.Verwendungszweck,
//         };
//       });
//   };

//   // return getCreditorSet(expenses);
//   // return getExpensesByCreditor("Vodafone");
//   return formatedIncome;
// };

const expensesBySpendingCategories = (getExpensesBySpendingCategories(creditorsBySpendingCategories))

log(expensesBySpendingCategories)

// const creditorSet = getCreditorSet(bankStatement);
// console.log({ creditorSet });

// const debtorSet = getDebtorSet(bankStatement);
// // console.log({debtorSet});

// const creditor = "";
// const debtor = "";

// if (hasEntry(creditor)) {
//   const expensesFromCreditor = getExpensesFromCreditor(creditor);
//   // console.log({ expensesFromCreditor });
// }
// if (hasEntry(debtor)) {
//   const incomesFromDebtor = getIncomesFromDebtor(debtor);
//   // console.log({ incomesFromDebtor });
// }

// const expensesBySpendingCategories = getExpensesBySpendingCategories();
// const totalExpenses = getTotalExpenses();
// console.log({
//   expensesBySpendingCategories,
//   totalExpenses:
//     totalExpenses -
//     expensesBySpendingCategories.expensesBySpendingCategories
//       .rueckzahlungAnPhine,
// });

// const allExpensesByCreditors = getAllExpensesByCreditors();
// // console.log({ allExpensesByCreditors });

// // console.table(bankStatement);
