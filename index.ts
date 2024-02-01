import { log } from "console";
import creditorsBySpendingCategories from "./creditorsBySpendingCategories";
import {
  getExpensesBySpendingCategories,
  getExpensesFromCreditor,
  getIncomesFromDebtor,
  incomes,
} from "./domain";

const expensesBySpendingCategories = getExpensesBySpendingCategories(
  creditorsBySpendingCategories
);

log(expensesBySpendingCategories);