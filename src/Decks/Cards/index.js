import React from 'react';
import {Route,Switch} from 'react-router-dom';
import {NewCard} from './NewCard'





const Cards  = () => {

return (
    <div>
        <Switch>
<Route path = '/decks/:deckId/cards/new'>
<NewCard/>
</Route>


        </Switch>
    </div>



)

}