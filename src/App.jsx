
import React, { useContext } from 'react'
import { AudioContext } from "./context/AppContext"
import MusicList from './components/MusicList/MusicList'
import SearchInput from './components/SearchInput/SearchInput'
import { Container, IconButton } from '@mui/material'

const App = () => {
  const value = useContext(AudioContext)
  // const {theme} = useContext(AudioContext)
  return (
    <div className={value.theme}>
      <Container maxWidth="md">
        <IconButton onClick={value.toggleTheme}>
          {value.theme}
        </IconButton>
      </Container>
      <h1 style={{ textAlign: 'center' }}>{value.text}</h1>
      <SearchInput />
      <MusicList />
    </div>
  )
}

export default App