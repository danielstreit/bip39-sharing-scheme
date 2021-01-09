import { Bip39WordInput } from "./WordInput";
import { Grid } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { SelectMnemonicStrength } from "./SelectMnemonicStrength";
import { strengths } from "./strength";

export function EnterWords() {
  const { watch } = useFormContext();
  const strength = watch("strength", 256);
  return (
    <>
      <Grid item xs={12}>
        <SelectMnemonicStrength />
      </Grid>
      {Array(strengths.get(strength))
        .fill("")
        .map((_value, index) => (
          <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
            <Bip39WordInput index={index} />
          </Grid>
        ))}
    </>
  );
}
