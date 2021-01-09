/**
 * Maps the strength in entropy length (bits) to the number of
 * words in the associated mnemonic.
 */
export const strengths = new Map([
  [128, 12],
  [160, 15],
  [192, 18],
  [224, 21],
  [256, 24],
]);
