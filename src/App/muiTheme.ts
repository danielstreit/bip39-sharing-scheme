import { createMuiTheme } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: pink[200],
      main: pink[400],
      dark: pink[700],
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiInputBase: {
      autoComplete: "off",
    },
  },
});
