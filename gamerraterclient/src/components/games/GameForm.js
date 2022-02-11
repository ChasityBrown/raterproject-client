import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGames, getCategories } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        year_released: 0,
        number_of_players: 0,
        estimated_time: 0,
        age_recommendation: 0,
        category: 0
    })

    useEffect(() => {
        // TODO: Get the categories, then set the state
        getCategories().then(data => setCategories(data))
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        domEvent.preventDefault()
        const copy = { ...currentGame }
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">New Game Information</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year_released">Year Released: </label>
                    <input type="text" name="year_released" required autoFocus className="form-control"
                        value={currentGame.year_released}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number Of Players: </label>
                    <input type="text" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="estimated_time">Estimated Time of Play: </label>
                    <input type="text" name="estimated_time" required autoFocus className="form-control"
                        value={currentGame.estimated_time}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age_recommendation">Age Recommendation: </label>
                    <input type="text" name="age_recommendation" required autoFocus className="form-control"
                        value={currentGame.age_recommendation}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category: </label>
                    <select name="category" required className="form-control"
                        value={currentGame.category}
                        onChange={changeGameState}>
                    <option value="0">Select a category</option>
                    {
                        categories.map(c => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                        ))
                    }
                    </select>
                </div>
            </fieldset>


            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        description: currentGame.description,
                        designer: currentGame.designer,
                        year_released: currentGame.year_released,
                        number_of_players: currentGame.number_of_players,
                        estimated_time: currentGame.estimated_time,
                        age_recommendation: currentGame.age_recommendation,
                        category: currentGame.category
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}