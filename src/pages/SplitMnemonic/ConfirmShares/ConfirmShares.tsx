import { useForm, FormProvider } from "react-hook-form";
import { Button, Grid } from "@material-ui/core";
import { ShareInput } from "./ShareInput";
import { ValidateSolution } from "./ValidateSolution";

export interface ConfirmSharesProps {
  onSubmit: () => void;
  mnemonic: string;
  shares: string[];
  threshold: number;
}

export function ConfirmShares({
  onSubmit,
  mnemonic,
  shares,
  threshold,
}: ConfirmSharesProps) {
  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid container item xs={12} spacing={3}>
            {shares.map((share, index) => (
              <Grid key={index} item xs={12}>
                <ShareInput index={index} share={share} />
              </Grid>
            ))}
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <ValidateSolution
              mnemonic={mnemonic}
              shares={shares}
              threshold={threshold}
            />
          </Grid>
          <Grid container item xs={12} spacing={3} justify="flex-end">
            <Grid item>
              <Button color="primary" type="submit" variant="contained">
                Done
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
