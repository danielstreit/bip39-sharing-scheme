import { Switch, Redirect, Route } from "react-router-dom";
import { SplitMnemonic } from "../pages/SplitMnemonic";
import { CombineShares } from "../pages/CombineShares";

export function Router() {
  return (
    <Switch>
      <Route path="/split">
        <SplitMnemonic />
      </Route>
      <Route path="/combine">
        <CombineShares />
      </Route>
      <Route path="/">
        <Redirect to="/combine" />
      </Route>
    </Switch>
  );
}
