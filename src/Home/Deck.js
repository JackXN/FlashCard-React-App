import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import deleteDeck from "../utils/api";

const Deck = ({deck}) => {
    const history = useHistory();

const handleDeleteDeck = () => {
    const abortController = new abortController();
    if(
        window.confirm(
            `You sure you want to delete ${deck.name}, There is no going back`
        )
    ) {
        deleteDeck(deck.id, abortController.signal);
        console.log('Deleted Deck');
        history.push('/');
        window.location.reload();
    }
}


if(deck) {
    return (
        <article className='card container-fluid m-1'>
            <div className = 'card-body'>
                <h1 className = 'card-title'>{deck.name}</h1>
                <p className = 'card-text'>{deck.description}</p>
            </div>

        </article>
    )
}

}