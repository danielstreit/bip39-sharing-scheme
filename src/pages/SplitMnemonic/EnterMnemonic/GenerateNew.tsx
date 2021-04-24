import { Controller, useFormContext } from "react-hook-form";
import { Grid, TextField } from "@material-ui/core";
import { generateMnemonic, validateMnemonic } from "bip39";
import { SelectMnemonicStrength } from "../../../components/SelectMnemonicStrength";
import { useEffect } from "react";

export function GenerateNew() {
  const { control, errors, setValue, watch } = useFormContext();

  const error = errors?.words;
  const strength = watch("strength", 256);

  useEffect(() => {
    setValue("words", generateMnemonic(strength));
  }, [setValue, strength]);

  return (
    <>
      <Grid item xs={12} sm={6}>
        <SelectMnemonicStrength />
      </Grid>
      <Grid item xs={12}>
        <Controller
          control={control}
          defaultValue={generateMnemonic(strength)}
          name="words"
          render={(props) => (
            <TextField
              {...props}
              error={!!error}
              fullWidth
              helperText={error?.message}
              InputProps={{ readOnly: true }}
              label="Generated mnemonic"
              multiline
              onChange={() => {}}
              variant="outlined"
            />
          )}
          rules={{
            required: "Required.",
            validate: (value) =>
              validateMnemonic(value) ||
              "Validation failed. Check that you've entered your mnemonic correctly.",
          }}
        />
      </Grid>
    </>
  );
}
