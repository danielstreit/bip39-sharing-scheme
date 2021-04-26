import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import {
  Controller,
  get,
  useFormContext,
  UseControllerOptions,
} from "react-hook-form";
import { TextField } from "@material-ui/core";
import { wordlists } from "bip39";
import { useRef } from "react";

export interface Bip39WordInputProps {
  autoFocus?: boolean;
  // TODO: Can we remove error here, consume from context instead?
  error?: boolean;
  label?: string;
  name: string;
}

const filterOptions = createFilterOptions({
  matchFrom: "start",
});

export function Bip39WordInput({
  autoFocus,
  error: removeMe,
  label,
  name,
  rules,
  ...passThrough
}: Bip39WordInputProps & UseControllerOptions) {
  const inputRef = useRef();
  const { control, errors } = useFormContext();

  const error = get(errors, name);

  return (
    <Controller
      {...passThrough}
      control={control}
      defaultValue=""
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
              helperText={error?.message}
              label={label}
              variant="outlined"
            />
          )}
        />
      )}
      rules={{
        required: true,
        ...rules,
      }}
    />
  );
}
