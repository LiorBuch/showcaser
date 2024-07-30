import { Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import {
  HomeScreen
} from "./screens";

export const ROUTES = {
  home: {
    path: "/",
    component: HomeScreen,
  }
} as const;

function Routes() {
  return (
    <Router hook={useHashLocation}>
      {Object.values(ROUTES).map((e) => {
        return <Route path={e.path} component={e.component} key={e.path}/>;
      })}
    </Router>
  );
}

export default Routes