import React, { useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom"
import { readDeck, deleteCard } from "../utils/api/index"


function DeckView({deck, setDeck, setCards, cards}) {
    const {deckId} = useParams();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        async function getDeck() {
            try {
                const response = await readDeck(deckId, signal)
                setDeck(response)
                setCards(response.cards)
            } catch (error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        getDeck()
        
        console.log(deck)
    }, [deckId])

    async function deleteCardHandler(cardId) {
        try {
          if(
            window.confirm(
              "Delete this deck?\n\nYou will not be able to recover it."
            )
          ) {
            await deleteCard(cardId);
            history.go(0)
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            throw error;
          }
        }
      }

    const listOfCards = cards.map(card => {
        return (
            <div className="card bg-light">
                <div className="card-body">
                    <h6 className="card-subtitle">Front</h6>
                    <p className="card-text text-muted">{card.front}</p>
                    <hr/>
                    <h6 className="card-subtitle">Back</h6>
                    <p className="card=text text-muted">{card.back}</p>
                </div>
                <div>
                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                        <button className="btn btn-secondary m-3" type="button">Edit</button>
                    </Link>
                        <button className="btn btn-danger" type="button" onClick={()=> deleteCardHandler(card.id)}>Delete</button>
                </div>
            </div>
        )
    })

    return (
        <div>
            <Link to="/">Home</Link>
            <span>{" "}/{" "}{deck.name}</span>
            <div className="card">
                <div className="card-body">
                    <h5>{deck.name}</h5>
                    <p>{deck.description}</p>
                    <Link to={`/decks/${deck.id}/edit`}>
                        <button className="btn btn-secondary" type="button">Edit</button>
                    </Link>
                    <Link to={`/decks/${deck.id}/study`}>
                        <button className="btn btn-primary" type="button">Study</button>
                    </Link>
                    <Link to={`/decks/${deck.id}/cards/new`}>
                        <button className="btn btn-primary" type="button">Add Cards</button>
                    </Link>
                </div>
            </div>
            <div>
            <h3>Cards</h3>
            <div>{listOfCards}</div>
            </div>
        </div>
    )
}

export default DeckView