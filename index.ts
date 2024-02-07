import { log } from "console";
import creditorsBySpendingCategories from "./creditorsBySpendingCategories";
import {
  createGetExpensesBySpendingCategories,
  createGetExpensesToCreditor,
  getTotalBalanceChange,
  createGetIncomesFromDebtor,
} from "./domain";
import { getBankStatement } from "./parseCsvToBankStatement";

const filename = "january-2024";
const bankStatement = getBankStatement(filename);

const getExpensesToCreditor = createGetExpensesToCreditor(bankStatement);
const expensesToCreditor = getExpensesToCreditor("foo");

const getIncomesFromDebtor = createGetIncomesFromDebtor(bankStatement);
const incomesFromDebtor = getIncomesFromDebtor("bar");

const getExpensesBySpendingCategories =
  createGetExpensesBySpendingCategories(bankStatement);
const expensesBySpendingCategories = getExpensesBySpendingCategories(
  creditorsBySpendingCategories
);

const totalBalanceChange = getTotalBalanceChange(bankStatement)

log(expensesBySpendingCategories);

// log({totalBalanceChange});
