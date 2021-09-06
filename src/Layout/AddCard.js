import React, {useEffect} from "react";
import { useHistory, useParams, Link } from "react-router-dom"
import { readDeck, createCard} from "../utils/api/index"

function AddCard({deck, setDeck, cards, setCards}) {
    const history = useHistory();
    const {deckId} = useParams();

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

    const handleChange = ({target}) => {
        setCards({
            ...cards, [target.name]: target.value,
        })
    }

    function handleSave(event) {
        event.preventDefault();
        async function updateCards() {
            await createCard(deckId, cards)
        }
        updateCards();
        setCards({
            front:"",
            back:"",
            deckId: deckId
        })
    }
    function handleDone() {
        history.push(`/decks/${deck.id}`)
    }

    return (
        <div>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>
            <div>
            <form>
                <div className= "form-group">
                    <label className="form-label" htmlFor="name">Front</label>
                        <textarea
                        type="text"
                        className="form-control"
                        id="front"
                        placeholder="Front side of card"
                        required
                        name="front"
                        onChange={handleChange}
                        value={cards.front}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="description">Back</label>
                        <textarea
                        type="text"
                        className="form-control input-lg"
                        id="back"
                        placeholder="Back side of card"
                        required
                        name="back"
                        onChange={handleChange}
                        value={cards.back}/>
                </div>
                <button type="submit" className="btn btn-secondary" onClick={handleDone}>Done</button>
                <button type="submit" className="btn btn-primary" onClick={handleSave}>Save</button>
            </form>
            </div>
        </div>
    )
}

export default AddCard