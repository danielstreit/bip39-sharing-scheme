import { Combination } from "js-combinatorics";
import secrets from "secrets.js-grempe";
import { mnemonicToEntropy } from "bip39";

export function validateAllCombinations(
  shares: string[],
  mnemonic: string,
  threshold: number
): boolean {
  const entropy = mnemonicToEntropy(mnemonic);
  let combos: string[][] = [];
  for (let i = threshold; i <= shares.length; i++) {
    const current = Combination.of(shares, i);
    combos = combos.concat([...current]);
  }

  combos.forEach((combo) => {
    const recovered = secrets.combine(combo);

    if (recovered !== entropy) {
      throw new Error(
        `Unexpected result: recovered value, ${recovered}, does not equal entropy, ${entropy}, for shares ${combo}`
      );
    }
  });
  return true;
}
