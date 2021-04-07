import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import {createCard, readDeck} from '../../utils/api';
import {CardForm} from './CardForm';

const NewCard = () => {
//Hooks
const {deckId} = useParams()

//create initial form state
const initializeForm = {
front : "",
back: "",
deckId,

}


const [card, setCard] = useState({...initializeForm});
const [deck, setDeck] = useState({});


//Load the cards from the API to determine a new card

useEffect(() => {
    async function loadDeck() {
        //get the name from the current deck
        const loadedDeck = await readDeck(deckId)
        setDeck(loadedDeck);
    }
    loadDeck();
}, [deckId])

//Update the state when the card info changes
const changeFront= (e) => {
    setCard({...card, back :e.target.value})
}

const changeBack = (e) => {
    setCard({...card, back :e.target.value})
}


const submitHandler = (e) => {
    e.preventDefault();
    async function updateData () {
        await createCard (deckId, card);
        setCard({...initializeForm})
    }
    updateData();
}



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
          Add Card
        </li>
      </ol>
    </nav>
    <h4>{deck.name}: Add Card</h4>
    <CardForm
      submitHandler={submitHandler}
      card={card}
      changeFront={changeFront}
      changeBack={changeBack}
    />
  </div>
);
}



export default NewCard