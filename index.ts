import { log } from "console";
import {
  createGetExpensesBySpendingCategories,
  createGetExpensesToCreditor,
  getTotalBalanceChange,
  createGetIncomesFromDebtor,
} from "./domain";
import { getBankStatement } from "./parseCsvToBankStatement";
import {creditorsBySpendingCategories} from "./creditorsBySpendingCategories";

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

// log(getExpensesToCreditor("food_creditor_1"))
log(expensesBySpendingCategories);
// log({totalBalanceChange});
