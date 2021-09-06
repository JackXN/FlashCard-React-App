import React from "react"
import { useHistory } from "react-router-dom";
import Cards from "./Cards"

function Home({decks, setDecks}){
    const history =useHistory();

    function HandleCreateDeck(event){
        event.preventDefault();
        history.push("/decks/new")
    }
    return (
        <div>
            <div>
                <button
                type="button"
                className="btn btn-secondary"
                onClick={HandleCreateDeck}>
                Create Deck
                </button>
            </div>
            <Cards decks={decks} setDecks={setDecks}/>
        </div>
    )
}

export default Home;