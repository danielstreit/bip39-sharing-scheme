import {
  AppBar,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useLocation, Link } from "react-router-dom";

export function Nav() {
  const { pathname } = useLocation();
  return (
    <AppBar position="static">
      <Grid alignContent="center" container spacing={3} justify="space-between">
        <Grid item xs={12} sm={6}>
          <Toolbar variant="dense">
            <Typography variant="h6">
              Bip39 Sharing Scheme using Shamir's
            </Typography>
          </Toolbar>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tabs
            value={pathname}
            indicatorColor="secondary"
            TabIndicatorProps={{
              style: {
                backgroundColor: "white",
              },
            }}
            variant="fullWidth"
          >
            <Tab component={Link} label="Split" to="/split" value="/split" />
            <Tab
              component={Link}
              label="Combine"
              to="/combine"
              value="/combine"
            />
          </Tabs>
        </Grid>
      </Grid>
    </AppBar>
  );
}
