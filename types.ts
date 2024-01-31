export type BankStatement = {
  amount: number;
  creditor: string;
  reference: string;
}[];

export type ExpensesByCreditor = {
  [creditor: string]: {
    totalAmount: number;
    // references: string[]
  };
};

export type CsvDataRow = Record<
  string,
  string | number | boolean | null | undefined
>;

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