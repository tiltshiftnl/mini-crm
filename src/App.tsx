import React from 'react'
import { Header } from '@datapunt/asc-ui'
import { HomePage } from './page/Home'
import './App.scss'
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'
import { ContactPage } from './page/Contacts'
import { SchoolPage } from './page/Schools'
import { ContactForm } from './elements/contactform'

const App = () => {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Header tall={false} title="Servicentrum Onderwijs" fullWidth={false} homeLink="/" />
        <ul className="menu-item-ul">
          <li className="menu-item-li"><NavLink className="menu-item" activeClassName="active" to="/schools">Scholen</NavLink></li>
          <li className="menu-item-li"><NavLink className="menu-item" activeClassName="active" to="/contacts">Docenten</NavLink></li>
        </ul>
        <Switch>
          <Route path="/schools">
            <SchoolPage />
          </Route>
          <Route path="/contacts/new">
            <ContactForm/>
          </Route>
          <Route path="/contacts">
            <ContactPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
