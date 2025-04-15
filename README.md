# Bank Statement Analyzer

A TypeScript-based tool for analyzing bank statements from CSV files. This project helps you categorize and analyze your expenses and incomes, providing insights into your spending patterns.

## Features

- Parse bank statement CSV files
- Categorize expenses into spending categories
- Calculate total expenses and incomes
- Track expenses by creditor
- Track incomes by debtor
- Calculate expense percentages by category
- Support for both public and private CSV files and configurations

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bank_statement_analyzer
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

- `csv_files/` - Public CSV files for bank statements
- `my_private_csv_files/` - Private CSV files (not tracked in git)
- `src/` - Source code files
  - `domain.ts` - Core business logic
  - `parseCsvToBankStatement.ts` - CSV parsing functionality
  - `types.ts` - TypeScript type definitions
  - `creditorsBySpendingCategories.ts` - Public spending category mappings
  - `myPrivateCreditorsBySpendingCategories.ts` - Private spending category mappings

## Usage

1. Place your bank statement CSV files in either:
   - `csv_files/` for public files
   - `my_private_csv_files/` for private files

2. Configure your spending categories in:
   - `creditorsBySpendingCategories.ts` for public categories
   - `myPrivateCreditorsBySpendingCategories.ts` for private categories

3. Run the application:
```bash
npm start
```

## CSV Format

The application expects CSV files with the following columns:
- `Betrag` - Amount
- `Beguenstigter/Zahlungspflichtiger` - Creditor/Debtor
- `Verwendungszweck` - Reference/Purpose

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run compile` - Compile and run the application
- `npm start` - Start the application with nodemon for development
- `npm test` - Run tests (currently not implemented)

## Dependencies

- `csv` - For parsing CSV files
- `decimal.js` - For precise decimal calculations
- `nodemon` - For development
- `typescript` - For type safety and compilation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

[Your Name]

## Acknowledgments

- Thanks to all contributors who have helped with this project
- Special thanks to the maintainers of the dependencies used in this project
