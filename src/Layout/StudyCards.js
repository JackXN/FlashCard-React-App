import React, { useEffect } from "react";
import { Link, useParams, } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import Study from "./Study";

function StudyCards({ deck, setDeck, cards, setCards}) {
    const {deckId} = useParams();

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

    console.log(deck)
    return (
        <div>
            <Link to="/">Home</Link>
            <span>{" "}/{" "}</span>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            <span>{" "}/{" "}Study</span>
            <h1>Study: {deck.name}</h1>
            <div>
                <Study cards={cards} deck={deck}/>
            </div>
        </div>
    )
}

export default StudyCards;