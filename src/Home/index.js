import React from "react";
import { Route, Switch } from "react-router";
import { Decks } from "../Decks";
import { CreateButton } from "./CreateButton";
import { Decklist } from "./Decklist";

export function Homepage({ decks }) {
  return (
    <div>
      <CreateButton />
      <Switch>
        <Route exact path="/">
          <Decklist decks={decks} />
        </Route>
        <Route path="/decks">
          <Decks decks={decks} />
        </Route>
      </Switch>
    </div>
  );
}