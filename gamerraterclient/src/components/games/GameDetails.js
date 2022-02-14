import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getGameById } from "./GameManager"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const GameDetails = () => {
    const [game, setGame] = useState({})
    const history = useHistory()
    const { gameId } = useParams()

    useEffect(
        () => {
            getGameById(gameId)
                .then((data) => {
                    setGame(data)
                })
        },
        [ gameId ]
    )

    return (
        <>
            <section className="game_Id" key={gameId}> 
                <h3 className="game__title">Title: {game.title}</h3>
                <div className="game__description">Description: {game.description}</div>
                <div className="game__number_of_players">Number of players: {game.number_of_players}</div>
                <div className="game__age_recommendation">Age Recommendation: {game.age_recommendation} yrs old and up</div>
                <div className="game__estimated_time">Estimated Time: {game.estimated_time} hour</div>
                <div className="game__category">Category: {game.category?.map(c => c.label)
                    } </div>
                <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: `/games/${game.id}/reviews` })
                }}>Review Game</button>
            </section>
        </>
    )
}    