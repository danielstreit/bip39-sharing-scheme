import { Bip39WordInput } from "../../../components/Bip39WordInput";
import { Grid } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import {
  SelectMnemonicStrength,
  strengths,
} from "../../../components/SelectMnemonicStrength";

export function EnterWords() {
  const { errors, watch } = useFormContext();
  const strength = watch("strength");
  return (
    <>
      <Grid item xs={12}>
        <SelectMnemonicStrength />
      </Grid>
      {Array(strengths.get(strength))
        .fill("")
        .map((_value, index) => (
          <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
            <Bip39WordInput
              name={`words[${index}]`}
              label={`Word ${index + 1}`}
              error={errors?.words?.[index]}
            />
          </Grid>
        ))}
    </>
  );
}
