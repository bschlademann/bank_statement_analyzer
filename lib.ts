export const parseCommaToFloat = (value: string) => {
  return parseFloat(value.replace(",", "."));
};

export const hasEntry = (str: string) => str !== "";
