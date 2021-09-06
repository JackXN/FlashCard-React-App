import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { createDeck } from "../utils/api/index";

function Form() {
    let history = useHistory();
    const initialFormState = {
        name: "",
        description: "",
    }
    const [formData, setFormData] = useState({...initialFormState});
    const handleChange = ({target}) => {
        setFormData({
            ...formData, [target.name]: target.value,
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await createDeck(formData)
        history.push(`/decks/${response.id}`)
    }

    function handleCancel(event) {
        event.preventDefault();
        history.push("/")
    }


    return (
        <form>
        <div className= "form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Deck Name"
                required
                name="name"
                onChange={handleChange}
                value={formData.name}/>
            </div>
            <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea
                type="text"
                className="form-control input-lg"
                id="description"
                placeholder="Brief description of the deck"
                required
                name="description"
                onChange={handleChange}
                value={formData.description}/>
        </div>
        <button type="submit" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default Form;