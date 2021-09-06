import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home"
import StudyCards from "./StudyCards"
import CreateDeck from "./CreateDeck"
import DeckView from "./DeckView"
import AddCard from "./AddCard"
import EditDeck from "./EditDeck"
import EditCard from "./EditCard"
import { BrowserRouter as Router, Route, Switch, useParams, useHistory } from "react-router-dom"

function Layout() {
  const [decks, setDecks] = useState([])
  const [deck, setDeck] = useState([])
  const [cards, setCards] = useState([]);
  

  return (
    <div>
      <Header />
      <div className ="container">
      <Switch>
        <Route exact path="/">
          <Home decks={decks} setDecks={setDecks}/>
        </Route>
        <Route exact path="/decks/new">
          <CreateDeck />
        </Route>
        <Route exact path="/decks/:deckId/study">
          <StudyCards deck={deck} setDeck={setDeck} cards={cards} setCards={setCards}/>
        </Route>
        <Route exact path="/decks/:deckId">
          <DeckView deck={deck} setDeck={setDeck} cards={cards} setCards={setCards}/>
        </Route>
        <Route exact path="/decks/:deckId/edit">
          <EditDeck deck={deck} setDeck={setDeck} />
        </Route>
        <Route exact path="/decks/:deckId/cards/new">
          <AddCard deck={deck} setDeck={setDeck} cards={cards} setCards={setCards}/>
        </Route>
        <Route exact path="/decks/:deckId/cards/:cardsId/edit">
          <EditCard deck={deck} setDeck={setDeck} cards={cards} setCards={setCards}/>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      </div>
    </div>
  );
}

export default Layout;
