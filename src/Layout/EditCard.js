import React, { useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { readDeck, updateCard, readCard } from "../utils/api/index"

function EditCard ({ deck, setDeck, cards, setCards}) {
    const { deckId, cardsId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        async function getDeck() {
            try {
                const response = await readDeck(deckId, signal)
                setDeck(response)
            } catch (error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        getDeck()
        
        console.log(deck)
    }, [deckId])

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        async function getDeck() {
            try {
                const response = await readCard(cardsId, signal)
                setCards(response)
            } catch (error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        getDeck()
        
        console.log(deck)
    }, [deckId])

    const handleChange = ({target}) => {
        setCards({
            ...cards, [target.name]: target.value,
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await updateCard(cards)
        history.push(`/decks/${deck.id}`)
    }

    function handleCancel(event) {
        event.preventDefault();
        history.push(`/decks/${deck.id}`)
    }

    return (
        <div>
            <Link to="/">Home</Link>
            <span>{" "}/{" "}</span>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            <span>{" "}/{" "}Edit Card {cardsId}</span>
            <h1>{deck.name}: Add Card</h1>
            <div>
                <form>
                    <div className= "form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                        <textarea
                        type="text"
                        className="form-control"
                        id="front"
                        placeholder={cards.front}
                        name="front"
                        onChange={handleChange}
                        value={cards.front}/>
                    </div>
                    <div className="form-group">
                    <label className="form-label" htmlFor="description">Description</label>
                        <textarea
                        type="text"
                        className="form-control input-lg"
                        id="back"
                        placeholder={cards.back}
                        name="back"
                        onChange={handleChange}
                        value={cards.back}/>
            </div>
                <button type="submit" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditCard