import React from "react"

import {Game} from "./components/Game"

import {Paper, Container} from '@mui/material'
import GridOnIcon from '@mui/icons-material/GridOn';

class App extends React.Component {
  render(){
    return (
      <Container maxWidth="sm" className="container">
        <Paper id="app-wrapper-card" elevation={10}>
          <h1><GridOnIcon /> Tic-Tac-Toe</h1>
          <Game />
      
        </Paper>
      </Container>
    )
  }
}


export default App
