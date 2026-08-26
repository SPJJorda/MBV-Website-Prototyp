const reserved = new Map([
  [126, "Max Mustermann"],
  [135, "Mia Musterfrau"],
  [143, "Max Mustermann"],
  [151, "Mia Musterfrau"],
  [153, "Max Mustermann"],
  [160, "Mia Musterfrau"],
  [166, "Max Mustermann"],
  [174, "Max Mustermann"],
  [178, "Mia Musterfrau"],
  [184, "Max Mustermann"],
  [187, "Mia Musterfrau"]
]);

const stoneColumns = [
  [4], [4], [3, 4, 5], [3, 4, 5], [2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7]
];

export const stones = stoneColumns.flatMap((columns, row) => columns.map((column, offset) => {
  const id = 118 + row * 8 + offset;
  return {
    id,
    label: `Turmstein ${id}`,
    row: row + 1,
    column,
    available: !reserved.has(id),
    patron: reserved.get(id) || ""
  };
}));

export const paymentMethods = [
  ["transfer", "Überweisung", "Bankverbindung nach Abschluss"],
  ["wero", "Wero", "Direkt mit Wero bezahlen"],
  ["paypal", "PayPal", "Mit PayPal fortfahren"],
  ["google-pay", "Google Pay", "Schnell und sicher bezahlen"],
  ["apple-pay", "Apple Pay", "Mit Apple Pay bezahlen"]
];

export const flowSteps = ["Stein auswählen", "Formular ausfüllen", "Zahlungsart wählen", "Patenschaft"];
