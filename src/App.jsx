import React from "react"

import {Game} from "./components/Game"

import {Paper, Container} from '@mui/material'

class App extends React.Component {
  render(){
    return (
      <Container maxWidth="sm" className="container">
        <Paper id="app-wrapper-card" elevation={10}>
          <h1>Tic-Tac-Toe Game</h1>
          <Game />
      
        </Paper>
      </Container>
    )
  }
}


export default App
