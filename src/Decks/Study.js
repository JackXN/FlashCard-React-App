import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import  {NotEnoughCards}  from "./Cards/NotEnoughCards";

export function Study({ decks }) {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  //const [deck] = decks.filter((deck) => deck.id === Number(deckId));

  //create useState object that contains info for cards in the deck, current card,
  //  Front/back boolean and a boolean for flipped
  const [studyState, setStudyState] = useState({
    cards: [],
    currentCard: 0,
    cardMax: 0,
    front: true,
    flipped: false,
  });

  //useEffect to fetch card data
  useEffect(() => {
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
      setStudyState({
        currentCard: 0,
        front: true,
        flipped: false,
        cards: loadedDeck.cards,
        cardMax: loadedDeck.cards.length,
      });
    }
    loadDecks();
  }, [deckId]);

  //if the deck has not loaded from API yet, display Loading
  if (!deck) {
    return <p>Loading...</p>;
  }

  if (
    //determine if there are enough cards in the deck (cardsInDeck.length)
    studyState.cards.length < 3
  ) {
    //  if there are not enough cards in the deck, return NotEnoughCards.
    return <NotEnoughCards deck={deck} />;
  }

  //function to flip cards
  function controlFlip() {
    setStudyState({
      ...studyState,
      front: !studyState.front, //change front to true or false based on current
      flipped: true, // always turns flipped to true, activates next button
    });
  }

  function determineSide() {
    return studyState.front
      ? studyState.cards[studyState.currentCard].front
      : studyState.cards[studyState.currentCard].back;
  }

  function numberOfCardsLeft() {
    return `${studyState.currentCard + 1} of ${studyState.cardMax}`;
  }

  function ifNextButton() {
    return studyState.flipped ? (
      <button className="btn-warning btn" onClick={nextCard}>
        Next
      </button>
    ) : null;
  }

  //returns whether or not the current card is the last card.
  function atMax() {
    return studyState.currentCard >= studyState.cardMax - 1;
  }

  //handles flipping to the next card and leaving the page
  function nextCard() {
    if (atMax()) {
      if (window.confirm("Start Over?")) {
        setStudyState({
          ...studyState,
          currentCard: 0,
          flipped: false,
          front: true,
        });
      } else {
        history.push("/");
      }
    } else {
      setStudyState({
        ...studyState,
        currentCard: studyState.currentCard + 1,
        flipped: false,
        front: true,
      });
    }
  }
  //return JSX that displays "content" as either front or back of card info,
  //  and buttons that change the state when the card is flipped and
  //  when next card is to be displayed.
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h4>Study: {deck.name}</h4>
      <div className="card w-100">
        <div className="card-body">
          <h6>Card {numberOfCardsLeft()}</h6>
          <p className="card-text">{determineSide()}</p>
          <button className="btn btn-primary" onClick={controlFlip}>
            Flip
          </button>
          {ifNextButton()}
        </div>
      </div>
    </div>
  );
}
