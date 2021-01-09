import { useFormContext } from "react-hook-form";
import { Grid, TextField } from "@material-ui/core";
import { validateMnemonic } from "bip39";

export function EnterList() {
  const { errors, register } = useFormContext();

  const error = errors?.words;

  return (
    <Grid item xs={12}>
      <TextField
        autoFocus
        error={!!error}
        fullWidth
        helperText={error?.message}
        label="Enter mnemonic"
        multiline
        name="words"
        inputRef={register({
          required: "Required.",
          validate: (value) =>
            validateMnemonic(value) ||
            "Validation failed. Check that you've entered your mnemonic correctly.",
        })}
        variant="outlined"
      />
    </Grid>
  );
}
