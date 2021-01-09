import { Controller, useForm, FormProvider } from "react-hook-form";
import { Button, Grid, TextField } from "@material-ui/core";
import secrets from "secrets.js-grempe";
import { useEffect } from "react";
import { mnemonicToEntropy } from "bip39";
import { GlobalFormError } from "../GlobalFormError";

export interface GenerateSharesProps {
  onSubmit: ({
    shares,
    threshold,
  }: {
    shares: string[];
    threshold: number;
  }) => void;
  mnemonic: string;
}

export function GenerateShares({ onSubmit, mnemonic }: GenerateSharesProps) {
  const formMethods = useForm({
    mode: "onChange",
  });
  const {
    clearErrors,
    control,
    errors,
    handleSubmit,
    setError,
    setValue,
    watch,
  } = formMethods;

  const numShares: number = watch("numShares", 5);
  const threshold: number = watch("threshold", 3);

  useEffect(() => {
    if (typeof threshold !== "number") {
      setError("global", {
        type: "shamir",
        message: "Threshold must be a number",
      });
    }
    if (numShares < 2) {
      setError("global", {
        type: "shamir",
        message: "At least 2 shares are required",
      });
    } else if (numShares > 255) {
      setError("global", {
        type: "shamir",
        message: "The max number of shares is 255",
      });
    } else if (threshold > numShares) {
      setError("global", {
        type: "shamir",
        message: "Threshold must be less than or equal to the number of shares",
      });
    } else if (threshold < 2) {
      setError("global", {
        type: "shamir",
        message: "Threshold must be at least 2",
      });
    } else {
      try {
        clearErrors();

        const entropy = mnemonicToEntropy(mnemonic as string);
        const shares = secrets.share(entropy, numShares, threshold);
        setValue("shares", shares);
      } catch (e) {
        setError("global", {
          type: "shamir",
          message: e.message,
        });
      }
    }
  }, [clearErrors, mnemonic, numShares, setError, setValue, threshold]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <GlobalFormError />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              defaultValue={5}
              name="numShares"
              render={(props) => (
                <TextField
                  {...props}
                  autoFocus
                  helperText="The number of shared to create"
                  label="Shares"
                  inputProps={{
                    max: 255,
                    min: threshold,
                  }}
                  type="number"
                  variant="outlined"
                />
              )}
              rules={{
                max: 255,
                min: threshold,
                valueAsNumber: true,
              }}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              defaultValue={3}
              name="threshold"
              render={(props) => (
                <TextField
                  {...props}
                  error={!!errors?.threshold}
                  helperText="The number of shares required to recover the mnemonic"
                  label="Threshold"
                  inputProps={{
                    max: numShares,
                    min: 2,
                  }}
                  type="number"
                  variant="outlined"
                />
              )}
              rules={{
                max: numShares,
                min: 2,
                valueAsNumber: true,
              }}
            />
          </Grid>
          <Grid container item xs={12} spacing={3}>
            {Array(numShares)
              .fill("")
              .map((_, index) => (
                <Grid key={index} item xs={12}>
                  <Controller
                    conrol={control}
                    defaultValue=""
                    name={`shares[${index}]`}
                    render={(props) => (
                      <TextField
                        {...props}
                        fullWidth
                        inputProps={{
                          readOnly: true,
                        }}
                        label={`Share ${index + 1}`}
                        onChange={() => {}}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              ))}
          </Grid>
          <Grid container item xs={12} spacing={3} justify="flex-end">
            <Grid item>
              <Button color="primary" type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
