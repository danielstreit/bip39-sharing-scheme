import { validateMnemonic } from "bip39";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Grid } from "@material-ui/core";
import { useCallback } from "react";
import { ToggleMode, EnterMnemonicMode } from "./ToggleMode";
import { EnterWords } from "./EnterWords";
import { EnterList } from "./EnterList";
import { GenerateNew } from "./GenerateNew";
import { GlobalFormError } from "../GlobalFormError";

export interface EnterMnemonicProps {
  onSubmit: (mnemonic: string) => void;
}

interface FormData {
  mode: EnterMnemonicMode;
  strength?: number;
  words: string | string[];
}

export function EnterMnemonic({ onSubmit }: EnterMnemonicProps) {
  const formMethods = useForm<FormData>({
    defaultValues: {
      mode: EnterMnemonicMode.Word,
      strength: 256,
      words: [],
    },
  });
  const { handleSubmit, setError, watch } = formMethods;

  const mode = watch("mode");

  const os = useCallback(
    (formData: FormData) => {
      const mnemonic = Array.isArray(formData.words)
        ? formData.words.join(" ")
        : formData.words;
      const isValid = validateMnemonic(mnemonic);

      if (!isValid) {
        setError("global", {
          type: "bip39Validation",
          message:
            "Invalid Bip39 Mnemonic. Make sure you entered your mnemonic correctly.",
        });
      } else {
        onSubmit(mnemonic);
      }
    },
    [setError, onSubmit]
  );

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(os)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <GlobalFormError />
          </Grid>
          <Grid container item xs={12} justify="center">
            <Grid item>
              <ToggleMode />
            </Grid>
          </Grid>
          <Grid container item spacing={3}>
            {mode === EnterMnemonicMode.Word && <EnterWords />}
            {mode === EnterMnemonicMode.List && <EnterList />}
            {mode === EnterMnemonicMode.Generate && <GenerateNew />}
          </Grid>
          <Grid container item spacing={3} justify="flex-end">
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
