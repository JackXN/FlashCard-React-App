import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import { DeckForm } from "./DeckForm";

export function NewDeck() {
  const history = useHistory();
  const [deck, setDeck] = useState({
    id: 0,
    name: "",
    description: "",
  });

  //when form is submitted, handles edit submission
  function submitButtonHandler(e) {
    e.preventDefault();
    createDeck(deck).then((output) => history.push(`/decks/${output.id}`));
  }
  //change deck state when name changes
  function changeName(e) {
    setDeck({ ...deck, name: e.target.value });
  }
  //change deck state when description changes
  function changeDesc(e) {
    setDeck({ ...deck, description: e.target.value });
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h4>Create Deck</h4>
      <DeckForm
        submitFunction={submitButtonHandler}
        deck={deck}
        changeName={changeName}
        changeDesc={changeDesc}
      />
    </div>
  );
}
