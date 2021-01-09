import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { diffChars } from "diff";

import type { Change } from "diff";
import type { CSSProperties } from "react";

export interface HintProps {
  share: string;
  isOpen: boolean;
  onClose: () => void;
  input: string;
}

const missingStyle: CSSProperties = {
  color: "green",
  fontWeight: "bolder",
  padding: "0 3px",
};

const unexpectedStyle: CSSProperties = {
  color: "red",
  fontWeight: "bolder",
  padding: "0 3px",
};

const correctStyle: CSSProperties = {};

export function Hint({ share, isOpen, onClose, input }: HintProps) {
  const changes = diffChars(input, share);
  return (
    <Dialog
      aria-labelledby="share-confirmation-hint-dialog"
      onClose={onClose}
      open={isOpen}
      maxWidth="lg"
    >
      <DialogTitle id="share-confirmation-hint-dialog">
        Share Confirmation Hint
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Missing charachters are in <span style={missingStyle}>green</span>
        </DialogContentText>
        <DialogContentText>
          Unexpected charachters are in <span style={unexpectedStyle}>red</span>
        </DialogContentText>
        <Diff changes={changes} />
      </DialogContent>
    </Dialog>
  );
}

interface DiffProps {
  changes: Change[];
}

function Diff({ changes }: DiffProps) {
  return (
    <Box p={3}>
      {changes.map((change) => {
        const style: CSSProperties = change.added
          ? missingStyle
          : change.removed
          ? unexpectedStyle
          : correctStyle;

        return <span style={style}>{change.value}</span>;
      })}
    </Box>
  );
}
