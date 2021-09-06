import React from "react";
import { Link, Switch } from "react-router-dom"
import Form from "./Form"

function CreateDeck() {
    return (
        <div>
        <Link to="/">Home</Link>
        <span>{" "}/{" "} Create Deck</span>
        <h1>Create Deck</h1>
        <div>
            <Form />
        </div>
    </div>
    )
}

export default CreateDeck