import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getGames, createReview, getGameById } from './GameManager.js'


export const ReviewForm = () => {
    const history = useHistory()
    const [game, setGame] = useState({})
    const { gameId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentReview, setCurrentReview] = useState({
        game: 0,
        player: 0,
        review: "",
        rating: 0
    })

    useEffect(() => {
        // TODO: Get the games, then set the state
        getGameById(gameId).then(data => setGame(data))
    }, [gameId])

    const changeReviewState = (domEvent) => {
        // TODO: Complete the onChange function
        domEvent.preventDefault()
        const copy = { ...currentReview }
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentReview(copy)
    }

    return (
        <form className="reviewForm">
            <h2 className="reviewForm__title">Leave a Review</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Review: </label>
                    <input type="textarea" name="title" required autoFocus className="form-control"
                        value={currentReview.title}
                        onChange={changeReviewState}
                    />
                </div>
            </fieldset>


            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const review = {
                        game: currentReview.game,
                        player: currentReview.player,
                        review: currentReview.review,
                        rating: currentReview.rating
                    }

                    // Send POST request to your API
                    createReview(review)
                        .then(() => history.push(`/games/${game.id}`))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}