import React from 'react'
import { Container } from 'semantic-ui-react'
import { Search } from './Search/Search'
import { Hero } from './Hero/Hero'
import { NavBar } from './NavBar/NavBar'

const App: React.FC = (): JSX.Element => {
  return (
    <Container>
      <NavBar />
      <Hero />
      <Search />
    </Container>
  )
}

export default App
