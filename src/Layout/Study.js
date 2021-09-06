import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Study({cards, deck}) {
    const history = useHistory();
    const [front, setFront] = useState(true)
    const [cardIndex, setCardIndex] = useState(0)
    console.log(cards)
    console.log(deck)

    function flip() {
        setFront(!front)
    }
    
    function next() {
        if (cardIndex + 1 < cards.length) {
            setCardIndex(cardIndex + 1);
            setFront(true)
        } else {
            const result = window.confirm(
                "Do you wan to restart? To return to the homepage click cancel"
            )
        if (result) {
            setFront(true);
            setCardIndex(0)
        } else {
            history.push("/")
        }
        }
    }


    if(cards.length <= 2) {
        return (
            <div>
            <h3>Not Enough Cards.</h3>
            <p>You need at least 3 cards to study. There are {cards.length} in this deck.</p>
            <Link to={`/decks/${deck.id}/cards/new`}>
                <button className="btn btn-primary">Add Cards</button>
            </Link>
        </div>
        )
    } else {
        return (
                  <div className="card bg-light">
            <div className="card-body">
                <h5 className="card-title">Card {cardIndex + 1} of {cards.length}</h5>
                <p className="card-text">{front ? deck.cards && deck.cards[cardIndex].front : deck.cards && deck.cards[cardIndex].back}</p>
                <div className="btnContainer">
                    {front ? null : <button onClick={next} className="btn btn-secondary">Next</button>}
                    <button onClick={flip} className="btn btn-primary">Flip</button>
                </div>
            </div>
        </div>
        )
    }
}

export default Study