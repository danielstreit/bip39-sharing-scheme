import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Grid, TextField } from "@material-ui/core";
import { splitMnemonic } from "shamir-bip39";
import { useMemo } from "react";
import { DisplayShares } from "./DisplayShares";

const defaultNumShares = 5;
const defaultThreshold = 3;

export interface GenerateSharesProps {
  onSubmit: (shares: Record<string, string>) => void;
  mnemonic: string;
}

interface FormState {
  numShares: number;
  threshold: number;
}

export function GenerateShares({ onSubmit, mnemonic }: GenerateSharesProps) {
  const formMethods = useForm<FormState>({
    defaultValues: {
      numShares: defaultNumShares,
      threshold: defaultThreshold,
    },
    mode: "onChange",
  });

  const {
    // clearErrors,
    control,
    errors,
    handleSubmit,
    // setError,
    // setValue,
    watch,
  } = formMethods;

  const numShares: number = watch("numShares");
  const threshold: number = watch("threshold");

  const shares = useMemo(() => splitMnemonic(mnemonic, numShares, threshold), [
    mnemonic,
    numShares,
    threshold,
  ]);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(() => {
          onSubmit(shares);
        })}
      >
        <Grid container spacing={3}>
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
        </Grid>
        <DisplayShares shares={shares} />
        <Grid container item xs={12} spacing={3} justify="flex-end">
          <Grid item>
            <Button color="primary" type="submit" variant="contained">
              Done
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
