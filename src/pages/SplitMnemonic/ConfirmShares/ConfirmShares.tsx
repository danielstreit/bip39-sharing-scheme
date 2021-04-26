import { useState } from "react";
import { Bip39WordInput } from "../../../components/Bip39WordInput";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@material-ui/core";

export interface ConfirmSharesProps {
  onDone: () => void;
  shares: Record<string, string>;
}

interface Share {
  id: string;
  mnemonic: string[];
}

export function ConfirmShares({ onDone, shares }: ConfirmSharesProps) {
  const shareIds = Object.keys(shares);
  const numShares = shareIds.length;
  const numWordsPerShare = shares[shareIds[0]].split(" ").length;

  const [confirmedShares, setConfirmedShares] = useState<string[]>([]);

  const currentShare = confirmedShares.length + 1;

  const formMethods = useForm<Share>({
    defaultValues: {
      id: "",
      mnemonic: Array(numWordsPerShare).fill(""),
    },
  });

  const { errors, getValues, handleSubmit, register, reset } = formMethods;

  const onSubmit = (values: Share) => {
    if (currentShare < numShares) {
      setConfirmedShares((prev) => prev.concat(values.id));
      reset();
    } else {
      onDone();
    }
  };

  console.log("currentShare", currentShare);
  console.log("confirmedShares", confirmedShares);

  console.log("shares", shares);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LinearProgress
              variant="determinate"
              value={(100 * currentShare) / numShares}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Confirm Share {currentShare} of {numShares}
            </Typography>
          </Grid>

          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12}>
              <TextField
                error={!!errors.id}
                helperText={errors.id?.message}
                inputRef={register({
                  required: "Required",
                  validate: {
                    notValidatedYet: (v) =>
                      !confirmedShares.includes(v) || "Share already confirmed",
                    isShareId: (v) =>
                      shareIds.includes(v) || "Not in share set",
                  },
                })}
                label="Share ID"
                name="id"
                variant="outlined"
              />
            </Grid>

            {Array(numWordsPerShare)
              .fill("")
              .map((_value: string, index: number) => (
                <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                  <Bip39WordInput
                    name={`mnemonic[${index}]`}
                    label={`Word ${index + 1}`}
                    error={!!errors?.mnemonic?.[index]}
                    rules={{
                      validate: (v) => {
                        const id = getValues("id");
                        const expectedWord = shares[id].split(" ")[index];
                        return v === expectedWord || "Unexpected word";
                      },
                    }}
                  />
                </Grid>
              ))}
          </Grid>
          <Grid container item xs={12} spacing={3} justify="flex-end">
            <Grid item>
              <Button color="primary" type="submit" variant="contained">
                Validate
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
