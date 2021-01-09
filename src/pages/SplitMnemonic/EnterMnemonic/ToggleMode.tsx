import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Controller, useFormContext } from "react-hook-form";

export enum EnterMnemonicMode {
  Word,
  Generate,
  List,
}

export function ToggleMode() {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={EnterMnemonicMode.Word}
      name="mode"
      render={(props) => (
        <ToggleButtonGroup
          {...props}
          aria-label="Select mode"
          exclusive
          onChange={(_event, value) => {
            if (value !== null) {
              props.onChange(value);
            }
          }}
        >
          <ToggleButton value={EnterMnemonicMode.Word}>
            Enter words
          </ToggleButton>
          <ToggleButton value={EnterMnemonicMode.List}>Enter list</ToggleButton>
          <ToggleButton value={EnterMnemonicMode.Generate}>
            Generate new mnemonic
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    />
  );
}
