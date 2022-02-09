import React, { useEffect, useState } from "react"
import { deleteGame, getGames } from "./GameManager.js"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Add a New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.designer} released in {game.year_released}</div>
                        <div className="game__description">Description: {game.description} </div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__estimatedTime">Time Estimated for play: {game.estimated_time}</div>
                        <div className="game__age">Age Recommendation: {game.age_recommendation}</div>
                        <button onClick={() => {
                            history.push({ pathname: `/games/${game.id}/update` })
                        }}>Edit</button>
                        <button onClick={() => deleteGame(game, game.id).then(res => setGames(res))
                            .then(() => history.push("/games"))} >Delete</button>
                    </section>
                })
            }
        </article>
    )
}