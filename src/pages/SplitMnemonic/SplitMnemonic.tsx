import { EnterMnemonic } from "./EnterMnemonic";
import { GenerateShares } from "./GenerateShares";
import { ConfirmShares } from "./ConfirmShares";
import { Grid, Stepper, Step, StepLabel } from "@material-ui/core";
import { useCallback, useState } from "react";

export enum SplitMnemonicSteps {
  EnterMnemonic,
  GenerateShares,
  ConfirmShares,
}

export function SplitMnemonic() {
  const [mnemonic, setMnemonic] = useState<string>();
  const [shares, setShares] = useState<string[]>();
  const [threshold, setThreshold] = useState<number>();
  const [activeStep, setActiveStep] = useState(
    SplitMnemonicSteps.EnterMnemonic
  );
  const reset = useCallback(() => {
    setActiveStep(SplitMnemonicSteps.EnterMnemonic);
    setMnemonic(undefined);
    setShares(undefined);
    setThreshold(undefined);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stepper activeStep={activeStep} style={{ backgroundColor: "inherit" }}>
          <Step>
            <StepLabel>Enter Mnemonic</StepLabel>
          </Step>
          <Step>
            <StepLabel>Generate Shares</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirm Shares</StepLabel>
          </Step>
        </Stepper>
      </Grid>
      <Grid item xs={12}>
        {activeStep === SplitMnemonicSteps.EnterMnemonic && (
          <EnterMnemonic
            onSubmit={(mnemonic) => {
              setMnemonic(mnemonic);
              setActiveStep(SplitMnemonicSteps.GenerateShares);
            }}
          />
        )}
        {activeStep === SplitMnemonicSteps.GenerateShares && (
          <GenerateShares
            onSubmit={({ shares, threshold }) => {
              setShares(shares);
              setThreshold(threshold);
              setActiveStep(SplitMnemonicSteps.ConfirmShares);
            }}
            mnemonic={mnemonic as string}
          />
        )}
        {activeStep === SplitMnemonicSteps.ConfirmShares && (
          <ConfirmShares
            onSubmit={reset}
            mnemonic={mnemonic as string}
            shares={shares as string[]}
            threshold={threshold as number}
          />
        )}
      </Grid>
    </Grid>
  );
}
