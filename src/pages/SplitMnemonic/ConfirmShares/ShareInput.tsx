import { Hint } from "./Hint";
import { useFormContext } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { CheckCircle as CheckCircleIcon } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";

export interface ShareInputProps {
  index: number;
  share: string;
}

export function ShareInput({ index, share }: ShareInputProps) {
  const [hintIsOpen, setHintIsOpen] = useState(false);
  const { errors, register, watch } = useFormContext();
  const name = `shares[${index}]`;
  const input = watch(name, "");
  const isCorrect = share === input;

  return (
    <>
      <TextField
        autoFocus={index === 0}
        defaultValue=""
        error={!!errors?.shares?.[index]}
        InputProps={{
          endAdornment: isCorrect ? (
            <CheckCircleIcon style={{ color: green[600] }} />
          ) : (
            <Button
              onClick={() => {
                setHintIsOpen(true);
              }}
            >
              Hint
            </Button>
          ),
        }}
        inputRef={register({
          required: "Required",
          validate(input) {
            return input === share;
          },
        })}
        fullWidth
        label={`Share ${index + 1}`}
        name={name}
        variant="outlined"
      />
      <Hint
        input={input}
        isOpen={hintIsOpen}
        onClose={() => {
          setHintIsOpen(false);
        }}
        share={share}
      />
    </>
  );
}
