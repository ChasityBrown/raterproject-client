import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./games/GameList.js"
import { GameForm } from "./games/GameForm.js"
import { GameDetails } from "./games/GameDetails.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route path="/games/:gameId(\d+)">
                <GameDetails />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
        </main>
    </>
}