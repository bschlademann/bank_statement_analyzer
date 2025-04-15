# add
- change structure of expensesWithPercentage from array containing objects to object containing keys
- getMonthlyAverage -> look at dates, get number of months, devide category amount by number of months for each category 
- chatGpt catch in domain.ts -> createGetExpensesBySpendingCategories -> see FIXME
- error handling
- data visualisation
- fuzzy search / recommendations when creditor/debtor is not found
- hosting (on aws? dome free hoster instead)

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
