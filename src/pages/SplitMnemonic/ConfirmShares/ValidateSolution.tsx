import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Grid, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { validateAllCombinations } from "./validateAllCombinations";

import { FieldError } from "react-hook-form";

export interface ValidateSolutionProps {
  mnemonic: string;
  shares: string[];
  threshold: number;
}

export enum ValidationState {
  Pending,
  Ready,
  Valid,
  Invalid,
}

export function ValidateSolution({
  mnemonic,
  shares,
  threshold,
}: ValidateSolutionProps) {
  const [state, setValidationState] = useState(ValidationState.Pending);
  const { clearErrors, errors, setError, watch } = useFormContext();
  const input = watch("shares", []);
  const canValidate = shares.every((share, index) => share === input[index]);

  useEffect(() => {
    if (canValidate) {
      setValidationState(ValidationState.Ready);
    } else {
      setValidationState(ValidationState.Pending);
    }
  }, [canValidate]);

  const validate = useCallback(() => {
    try {
      validateAllCombinations(shares, mnemonic, threshold);
      setValidationState(ValidationState.Valid);
      clearErrors();
    } catch (e) {
      setValidationState(ValidationState.Invalid);
      setError("validateSolution", {
        type: "validate",
        message: e.message,
      });
    }
  }, [clearErrors, setError, shares, mnemonic, threshold]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Sanity Check</Typography>
        <Typography variant="body1">
          Run all share combinations through the combine algorithm and assert
          the expected mnemonic is recovered.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Status
          error={errors.validationSolution}
          state={state}
          validate={validate}
        />
      </Grid>
    </>
  );
}

function Status({
  error,
  state,
  validate,
}: {
  error?: FieldError;
  state: ValidationState;
  validate: () => void;
}) {
  switch (state) {
    case ValidationState.Pending:
      return (
        <Alert severity="warning">
          Enter all shares before validating combinations
        </Alert>
      );
    case ValidationState.Ready:
      return (
        <Alert
          action={<Button onClick={validate}>Validate</Button>}
          severity="info"
        >
          Ready to validate
        </Alert>
      );
    case ValidationState.Valid:
      return (
        <Alert severity="success">
          <AlertTitle>Shares Validated</AlertTitle>Congradulations! You've
          successfully split your mnemonic
        </Alert>
      );
    case ValidationState.Invalid:
      return (
        <Alert severity="error">
          <AlertTitle>Validation failed</AlertTitle>
          {error?.message}
        </Alert>
      );
  }
}
