import { Grid, TextField, Typography } from "@material-ui/core";

export interface DisplaySharesProps {
  shares: Record<string, string>;
}

export function DisplayShares({ shares }: DisplaySharesProps) {
  return (
    <>
      <Typography component="h3" gutterBottom variant="h5">
        Shares
      </Typography>
      <Typography paragraph variant="body1">
        These are the generated shares. Copy them down separately. In the next
        step, you'll confirm that you've copied them correctly. Then, store them
        separately, in safe locations.
      </Typography>
      <Grid container spacing={3}>
        {Object.keys(shares).map((shareId) => {
          const share = shares[shareId];
          return (
            <Grid key={shareId} container item xs={12} spacing={3}>
              <Grid item xs={12} sm={2}>
                <TextField
                  inputProps={{ readOnly: true }}
                  label="ID"
                  variant="outlined"
                  value={shareId}
                />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  fullWidth
                  inputProps={{ readOnly: true }}
                  label="Mnemonic"
                  multiline
                  variant="outlined"
                  value={share}
                />
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
