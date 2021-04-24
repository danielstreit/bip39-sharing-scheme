import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Button, Grid } from "@material-ui/core";
import { ShareInput } from "./ShareInput";
import { SelectMnemonicStrength } from "../../../components/SelectMnemonicStrength";

export interface ConfirmSharesProps {
  onSubmit: () => void;
  shares: Record<string, string>;
}

interface Share {
  id: string;
  mnemonic: string[];
}

interface FormInputs {
  shares: Share[];
  strength: number;
}

export function ConfirmShares({ onSubmit, shares }: ConfirmSharesProps) {
  const formMethods = useForm<FormInputs>({
    defaultValues: {
      shares: [{ id: "", mnemonic: [] }],
      strength: 256,
    },
  });
  const { control, handleSubmit } = formMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "shares",
    keyName: "key",
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid container item xs={12}>
            <SelectMnemonicStrength />
          </Grid>
          {fields.map((field, index) => {
            console.log("field", field);
            return (
              <ShareInput
                key={field.key}
                field={field}
                remove={() => {
                  remove(index);
                }}
              />
            );
          })}
          <Grid container item xs={12} spacing={3} justify="flex-end">
            <Grid item>
              <Button
                onClick={() => {
                  append({}, true);
                }}
                variant="contained"
              >
                Add share
              </Button>
            </Grid>
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
