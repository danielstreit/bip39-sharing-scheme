import { useFormContext } from "react-hook-form";
import { Collapse } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export function GlobalFormError() {
  const { clearErrors, errors } = useFormContext();

  return (
    <Collapse in={!!errors.global}>
      <Alert
        onClose={() => {
          clearErrors("global");
        }}
        severity="error"
      >
        {errors.global?.message}
      </Alert>
    </Collapse>
  );
}
