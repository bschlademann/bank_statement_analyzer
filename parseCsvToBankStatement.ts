import { parse } from "csv-parse/sync";
import fs from "fs";
import { ParsedCsvRow } from "./types";
import { parseCommaToFloat } from "./lib";
import Decimal from "decimal.js";

export const readCsv = (filename: string) =>
  fs.readFileSync(`./csv_files/${filename}.CSV`, "utf-8");

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

export const getBankStatement = (filename: string) => {
  const csv = readCsv(filename);
  const parsedCsv = parseCsvRows(csv);
  const bankStatement = mapParsedCsvToBankStatement(parsedCsv);
  return bankStatement;
};
