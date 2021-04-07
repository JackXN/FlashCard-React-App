import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import { CardForm } from "./CardForm";

export function EditCard() {
  //set up hooks
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState({
    id: cardId,
    front: "",
    back: "",
    deckId: Number(deckId),
  });
  const [deckName, setDeckName] = useState("");

  //load cards from API to determine new card ID
  useEffect(() => {
    async function loadCard() {
      //get cards from API
      const loadedCard = await readCard(cardId);
      //set card id at + 1 length of current card array
      setCard({
        id: cardId,
        deckId: Number(deckId),
        front: loadedCard.front,
        back: loadedCard.back,
      });
    }
    async function loadDeckName() {
      //get name from current deck
      const deck = await readDeck(deckId);
      setDeckName(deck.name);
    }
    loadCard();
    loadDeckName();
  }, [cardId, deckId]);

  //update the state as card info changes
  function changeFront(e) {
    setCard({ ...card, front: e.target.value });
  }
  function changeBack(e) {
    setCard({ ...card, back: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    updateCard(card).then((output) => history.push(`/decks/${output.deckId}`));
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <h4>Edit Deck</h4>
      <CardForm
        submitHandler={submitHandler}
        card={card}
        changeFront={changeFront}
        changeBack={changeBack}
      />
    </div>
  );
}
