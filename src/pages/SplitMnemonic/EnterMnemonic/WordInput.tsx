import { Autocomplete } from "@material-ui/lab";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { wordlists } from "bip39";
import { useRef } from "react";

export interface Bip39WordInputProps {
  index: number;
}

// TODO: Move to appropriate page
export function Bip39WordInput({ index }: Bip39WordInputProps) {
  const inputRef = useRef();
  const { control, errors } = useFormContext();
  const error = errors?.words?.[index];

  return (
    <Controller
      control={control}
      defaultValue={null}
      name={`words[${index}]`}
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
          onChange={(_, data) => props.onChange(data)}
          options={wordlists.english}
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus={index === 0}
              inputRef={inputRef}
              error={!!error}
              label={`Word ${index + 1}`}
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
