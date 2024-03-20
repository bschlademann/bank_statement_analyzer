# add
- error handling
- data visualisation
- fuzzy search / recommendations when creditor/debtor is not found
- hosting on aws

# fix

- fix typing from "string" to "SpendingCategory"
  in {createGetExpensesBySpendingCategories}:
  ```ts
  const expensesBySpendingCategories = spendingCategories.reduce(
      (
        expensesBySpendingCategories: { [spendingCategory: string]: Decimal }))
  ```
  and in types.ts
  ```ts
  type ExpensesBySpendingCategories = { [spendingCategory: string]: Decimal };
  ```
- handle non-existant filename in {getBankStatement}
- handle non-fitting csv files
- handle multiple entries of same vendor in different spending categories
