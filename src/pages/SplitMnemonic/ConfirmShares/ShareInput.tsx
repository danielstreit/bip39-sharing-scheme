import { useFormContext, UseFieldArrayMethods } from "react-hook-form";
import { Bip39WordInput } from "../../../components/Bip39WordInput";
import { Button, Grid, TextField } from "@material-ui/core";
import { strengths } from "../../../components/SelectMnemonicStrength";

type Field = UseFieldArrayMethods["fields"][0];

export interface ShareInputProps {
  field: Field;
  remove: () => void;
}

export function ShareInput({ field, remove }: ShareInputProps) {
  const { errors, register, watch } = useFormContext();
  const strength = watch("strength");

  console.log("strength", strength);

  return (
    <Grid container item xs={12} spacing={3}>
      <Grid item xs={6}>
        <TextField
          inputRef={register({
            required: "Required",
          })}
          label="Share ID"
          name={`${field.id}.id`}
          variant="outlined"
        />
      </Grid>
      <Grid container item justify="flex-end" xs={6}>
        <Grid item>
          <Button onClick={remove} variant="contained">
            Remove share
          </Button>
        </Grid>
      </Grid>

      {Array(strengths.get(strength))
        .fill("")
        .map((_value, index) => (
          <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
            <Bip39WordInput
              name={`words[${index}]`}
              label={`Word ${index + 1}`}
              error={errors?.words?.[index]}
            />
          </Grid>
        ))}
    </Grid>
  );
}
