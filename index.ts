import { log } from "console";
import {
  createGetExpensesBySpendingCategories,
  createGetExpensesToCreditor,
  getTotalBalanceChange,
  createGetIncomesFromDebtor,
} from "./domain";
import { getBankStatement } from "./parseCsvToBankStatement";
import { creditorsBySpendingCategories } from "./creditorsBySpendingCategories";

// update filename of csv here
const filename = "january-2024";

const bankStatement = getBankStatement(filename);
const getExpensesToCreditor = createGetExpensesToCreditor(bankStatement);
const getIncomesFromDebtor = createGetIncomesFromDebtor(bankStatement);
/**
 * Initializes and retrieves expenses categorized by spending categories from the bank statement.
 * This function utilizes `createGetExpensesBySpendingCategories` from the domain logic to process the bank statement data.
 * It categorizes each expense based on the predefined categories in `creditorsBySpendingCategories`.
 *
 * @returns {Object} An object containing three properties:
 *  - totalExpenses: Decimal - the sum of all categorized expenses.
 *  - expensesBySpendingCategories: Object - a mapping of spending categories to their respective total expenses.
 *  - missingEntries: Array - a list of transactions that couldn't be categorized into any of the predefined categories.
 * 
 * Example of return value:
 * {
 *   totalExpenses: Decimal('-1234.56'),
 *   expensesBySpendingCategories: {
 *     food: Decimal('-234.56'),
 *     travel: Decimal('-1000.00')
 *   },
 *   missingEntries: [
 *     { creditor: 'Uncategorized Creditor', reference: 'Transaction Reference' }
 *   ]
 * }
 *
 * The `bankStatement` variable should be previously initialized and contain the parsed bank statement data.
 */
const getExpensesBySpendingCategories =
  createGetExpensesBySpendingCategories(bankStatement);
const expensesBySpendingCategories = getExpensesBySpendingCategories(
  creditorsBySpendingCategories
);
const totalBalanceChange = getTotalBalanceChange(bankStatement);

// log results here
log(expensesBySpendingCategories)
// log(getIncomesFromDebtor("foo"));
// log(getExpensesToCreditor("food_creditor_1"));
// log({ totalBalanceChange });
