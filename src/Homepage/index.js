import React from "react";
import { Route, Switch } from "react-router";
import { Decks } from "../Decks";
import { CreateButton } from "./ButtonCreate";
import  {Decklist}  from "./DeckList";

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