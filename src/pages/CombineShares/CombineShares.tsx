import {
  Button,
  Collapse,
  IconButton,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useForm, useFieldArray } from "react-hook-form";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";
import { useState } from "react";
import { Result } from "./Result";
import secrets from "secrets.js-grempe";
import { entropyToMnemonic } from "bip39";
import { Alert, AlertTitle } from "@material-ui/lab";

export function CombineShares() {
  const [resultIsOpen, setResultIsOpen] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const {
    clearErrors,
    control,
    errors,
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm({
    defaultValues: {
      global: true,
      shares: [{ value: "" }, { value: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "shares",
  });

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Enter shares to recover mnemonic
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Collapse in={!!errors?.global}>
            <Alert
              onClose={() => {
                clearErrors("global");
              }}
              severity="error"
            >
              <AlertTitle>Failed to Recover Mnemonic</AlertTitle>
              <p>Message: {errors.global?.message}</p>
              <p>
                Make sure you've included enough shares to meet the threshold.
              </p>
            </Alert>
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <form
            onReset={() => {
              reset();
            }}
            onSubmit={handleSubmit((data) => {
              try {
                const shares = data.shares.map((share) => share.value);
                const entropy = secrets.combine(shares);
                const mnemonic = entropyToMnemonic(entropy);
                setMnemonic(mnemonic);
                setResultIsOpen(true);
              } catch (e) {
                setError("global", {
                  type: "Failed to recover mnemonic",
                  message: e.message,
                });
              }
            })}
          >
            <Grid container spacing={3}>
              <Grid container item xs={12} spacing={3}>
                {fields.map((field, index) => {
                  return (
                    <Grid key={field.id} item xs={12}>
                      <TextField
                        autoFocus={index === 0}
                        defaultValue={field.value}
                        error={!!errors?.shares?.[index]?.value}
                        helperText={errors?.shares?.[index]?.value?.message}
                        inputRef={register({
                          required: true,
                          minLength: 3,
                          validate(share) {
                            try {
                              secrets.extractShareComponents(share);
                              return true;
                            } catch (e) {
                              return e.message;
                            }
                          },
                        })}
                        InputProps={{
                          endAdornment: index > 1 && (
                            <IconButton
                              onClick={() => {
                                clearErrors("global");
                                remove(index);
                              }}
                            >
                              <RemoveIcon />
                            </IconButton>
                          ),
                        }}
                        fullWidth
                        label={`Share`}
                        name={`shares[${index}].value`}
                        variant="outlined"
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <Grid container item xs={12} spacing={3} justify="flex-end">
                <Grid item>
                  <IconButton
                    onClick={() => {
                      clearErrors("global");
                      append({ value: "" });
                    }}
                    style={{
                      marginRight: 13,
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3} justify="flex-end">
                <Grid item>
                  <Button type="reset" variant="contained">
                    Reset
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="primary" type="submit" variant="contained">
                    Recover
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Result
        isOpen={resultIsOpen}
        mnemonic={mnemonic}
        onClose={() => {
          setResultIsOpen(false);
        }}
      />
    </>
  );
}
