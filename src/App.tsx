import { Header } from '@datapunt/asc-ui'
import React from 'react'
import { Home } from './page/Home';

const App = () => {
  return (
    <div className="App">
      <Header tall={false} title="Servicentrum Onderwijs" fullWidth={false} homeLink="/" />
      <Home key={1}/>
    </div>
  )
}

export default App;
