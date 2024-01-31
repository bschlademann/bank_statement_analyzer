import { parse } from "csv-parse/sync";
import fs from "fs";
import { ParsedCsvRow } from "./types";
import { parseCommaToFloat } from "./lib";

const filename = "january-2024";

export const csv = fs.readFileSync(`./csv_files/${filename}.CSV`, "utf-8");

export const parsedCsv: ParsedCsvRow[] = parse(csv, {
  columns: true,
  skip_empty_lines: true,
  delimiter: ";",
});

export const getBankStatement = (parsedCsv: ParsedCsvRow[]) => {
  return parsedCsv.map((ParsedCsvRow) => {
    return {
      amount: parseCommaToFloat(ParsedCsvRow.Betrag),
      creditor: ParsedCsvRow["Beguenstigter/Zahlungspflichtiger"],
      reference: ParsedCsvRow.Verwendungszweck,
    };
  });
};

export const bankStatement = getBankStatement(parsedCsv);