import { log } from "console";
import creditorsBySpendingCategories from "./creditorsBySpendingCategories";
import {
  getExpensesBySpendingCategories
} from "./domain";

const expensesBySpendingCategories = getExpensesBySpendingCategories(
  creditorsBySpendingCategories
);

log(expensesBySpendingCategories);

// log({getTotalBalanceChange})