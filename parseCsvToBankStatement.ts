import { parse } from "csv-parse/sync";
import fs from "fs";
import { ParsedCsvRow } from "./types";
import { parseCommaToFloat } from "./lib";
import Decimal from "decimal.js";

export const getCreditorsBySpendingCategories = () => {
  let creditorsBySpendingCategories;
  try {
    // Try to load the private module
    creditorsBySpendingCategories =
      require("./myPrivateCreditorsBySpendingCategories").creditorsBySpendingCategories;
  } catch (error) {
    // If it fails, fall back to the public module
    creditorsBySpendingCategories =
      require("./creditorsBySpendingCategories").creditorsBySpendingCategories;
  }
  return creditorsBySpendingCategories;
};

export const readCsv = (filename: string) => {
  try {
    // Try to load the file from the private folder
    return fs.readFileSync(`my_private_csv_files/${filename}.CSV`, "utf-8");
  } catch {
    // If it fails, fall back to the public folder
    return fs.readFileSync(`csv_files/${filename}.CSV`, "utf-8");
  }
};

export const parseCsvRows = (csv: string): ParsedCsvRow[] =>
  parse(csv, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ";",
  });

export const mapParsedCsvToBankStatement = (parsedCsv: ParsedCsvRow[]) => {
  return parsedCsv.map((ParsedCsvRow) => {
    return {
      amount: new Decimal(parseCommaToFloat(ParsedCsvRow.Betrag)),
      creditor: ParsedCsvRow["Beguenstigter/Zahlungspflichtiger"],
      reference: ParsedCsvRow.Verwendungszweck,
    };
  });
};

export const getBankStatement = (
  filename: string,
) => {
  const csv = readCsv(filename);
  const parsedCsv = parseCsvRows(csv);
  const bankStatement = mapParsedCsvToBankStatement(parsedCsv);
  return bankStatement;
};
