# Simple Sparkasse Bank Statement Analyzer

## Description

The Simple Bank Statement Analyzer is a TypeScript project designed to process bank statements from the Sparkasse, enabling users to analyze their financial transactions categorized by expenses and incomes. It features functionalities to categorize transactions into predefined spending categories, calculate total expenses and incomes, and identify transactions not matching any category.

## Features

- expenses by spending categories, highlighting transactions not categorized under any spending category
- expenses to a creditor
- incomes from a debtor
- total balance change

## Installation

### Prerequisites

- Node.js
- npm or yarn

### Steps

1. Clone the repository:

```bash
git clone https://github.com/bschlademann/bank_statement_analyzer.git
```

2. Navigate to the project directory:

```bash
cd bank_statement_analyzer
```

3. Install dependencies:

```bash
npm install
# or if you use yarn
yarn install
```

## Usage

1. Export a csv file from your sparkasse online banking and put it in csv_files/
2. Update the filename variable in the index.ts with the name of your bank statement file
3. Update the object in creditorsBySpendingCategories.ts with your own spending categories. The keys are the categories and the values the coresponding creditors as an array of strings.

```js
food: [
  "food_creditor_1",
  "food_creditor_2"
],
travel: [
  "creditor_1",
  "travel_creditor_2"
]
```

4. in index.ts uncomment the loggers you want to use
ExpensesBySpendingCategories has a key "missingentries" that shows the name and reference of statement entries that were not found in creditorsBySpendingCategories. Both name and reference are necessary as the names of creditors can come up in either and it depends on the creditor where that happens. 
5. To run the analyzer:

```bash
npm start
# or using Node directly
node index.js
```

## my to do

# add
- percentile calculation on getExpensesByCSpendingCategories
- data visualisation
- fuzzy search / recommendations when creditor/debtor is not found
- hosting on aws

# fix

- handle non-existant filename in {getBankStatement}
- handle non-fitting csv files
- handle multiple entries of same vendor in different spending categories

## Contributing

Contributions are welcome! If you have suggestions for improving the bank statement analyzer, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
