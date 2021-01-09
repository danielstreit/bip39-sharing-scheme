import { Controller, useFormContext } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { strengths } from "./strength";

export function SelectMnemonicStrength() {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={256}
      name="strength"
      render={(props) => (
        <FormControl variant="outlined">
          <InputLabel id="select-mnemonic-strength-label">Strength</InputLabel>
          <Select
            {...props}
            label="Strength"
            labelId="select-mnemonic-strength-label"
          >
            {Array.from(strengths).map(([strength, wordCount]) => (
              <MenuItem key={strength} value={strength}>
                {wordCount} words
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
