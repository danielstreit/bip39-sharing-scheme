import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@material-ui/core";

export interface ResultProps {
  isOpen: boolean;
  mnemonic: string;
  onClose: () => void;
}

export function Result({ isOpen, mnemonic, onClose }: ResultProps) {
  return (
    <Dialog fullWidth onClose={onClose} open={isOpen} maxWidth="sm">
      <DialogTitle>Recovered Mnemonic</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          label="Mnemonic"
          multiline
          value={mnemonic}
          variant="outlined"
        />
      </DialogContent>
    </Dialog>
  );
}
