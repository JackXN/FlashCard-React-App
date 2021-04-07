import React from "react";
import { Switch, Route } from "react-router-dom";
import { Cards } from "./Cards";
import { EditDeck } from "./EditDeck";
import { NewDeck } from "./NewDeck";
import { Study } from "./Study";
import { ViewDeck } from "./ViewDeck";

//    DECKS displays NEW DECK or EDIT DECK screens

export function Decks({ decks }) {
  return (
    <div>
      <Switch>
        <Route path="/decks/new">
          <NewDeck />
        </Route>
        <Route path="/decks/:deckId/study">
          <Study decks={decks} />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards">
          <Cards />
        </Route>
        <Route path="/decks/:deckId">
          <ViewDeck />
        </Route>
      </Switch>
    </div>
  );
}
