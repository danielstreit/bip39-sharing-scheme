import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { wordlists } from "bip39";
import { useRef } from "react";

export interface Bip39WordInputProps {
  autoFocus?: boolean;
  error?: boolean;
  label?: string;
  name: string;
}

const filterOptions = createFilterOptions({
  matchFrom: "start",
});

export function Bip39WordInput({
  autoFocus,
  error,
  label,
  name,
}: Bip39WordInputProps) {
  const inputRef = useRef();
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={null}
      name={name}
      onFocus={() => {
        if (inputRef.current) {
          // @ts-ignore - Need to figure out how to type ref correctly with MUI
          inputRef.current.focus();
        }
      }}
      render={(props) => (
        <Autocomplete
          {...props}
          autoComplete
          autoHighlight
          autoSelect
          filterOptions={filterOptions}
          onChange={(_, data) => props.onChange(data)}
          options={wordlists.english}
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus={autoFocus}
              inputRef={inputRef}
              error={!!error}
              label={label}
              variant="outlined"
            />
          )}
        />
      )}
      rules={{
        required: true,
      }}
    />
  );
}
