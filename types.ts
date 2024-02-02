import Decimal from "decimal.js";

export type BankStatement = {
  amount: Decimal;
  creditor: string;
  reference: string;
}[];

export type ExpensesByCreditor = {
  [creditor: string]: {
    totalAmount: number;
    // references: string[]
  };
};


export type Expenses = BankStatement;
export type Incomes = BankStatement;

export type ParsedCsvRow = {
  Auftragskonto: string;
  Buchungstag: string;
  Valutadatum: string;
  Buchungstext: string;
  Verwendungszweck: string;
  "Glaeubiger ID": string;
  Mandatsreferenz: string;
  "Kundenreferenz (End-to-End)": string;
  Sammlerreferenz: string;
  "Lastschrift Ursprungsbetrag": string;
  "Auslagenersatz Ruecklastschrift": string;
  "Beguenstigter/Zahlungspflichtiger": string;
  "Kontonummer/IBAN": string;
  "BIC (SWIFT-Code)": string;
  Betrag: string;
  Waehrung: string;
  Info: string;
};


export type CreditorsBySpendingCategories = { [key: string]: string[] }