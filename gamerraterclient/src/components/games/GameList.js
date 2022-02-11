import React, { useEffect, useState } from "react"
import { deleteGame, getGames } from "./GameManager.js"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Link } from "react-router-dom"

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
                    return(
                    <> 
                    <section key={`game--${game.id}`} className="game">
                        <div className="game__title">
                            <Link to={`./games/${game.id}`}>{game.title}</Link>
                            </div>
                        <button onClick={() => {
                            history.push({ pathname: `/games/${game.id}/update` })
                        }}>Edit</button>
                        <button onClick={() => deleteGame(game, game.id).then(res => setGames(res))
                            .then(() => history.push("/games"))} >Delete</button>
                    </section>
                    </>)
                })
            }
        </article>
    )
}