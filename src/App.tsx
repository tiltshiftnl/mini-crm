import React from 'react'
import { Header } from '@datapunt/asc-ui'
import { HomePage } from './page/Home'
import './App.scss'
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'
import { ContactPage } from './page/Contacts'
import { SchoolPage } from './page/Schools'
import { ContactForm } from './elements/contactform'
import { ContactDetailForm } from './elements/contactdetailform'

const App = () => {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Header tall={false} title="Servicentrum Onderwijs" fullWidth={false} homeLink="" />
        <ul className="menu-item-ul">
          <li className="menu-item-li"><NavLink className="menu-item" exact activeClassName="active" to="/">Home</NavLink></li>
          <li className="menu-item-li"><NavLink className="menu-item" activeClassName="active" to="/schools">Scholen</NavLink></li>
          <li className="menu-item-li"><NavLink className="menu-item" activeClassName="active" to="/contacts">Contacten</NavLink></li>
        </ul>
        <Switch>
          <Route path="/schools" component={SchoolPage}/>
          <Route path="/contacts/new" component={ContactForm}/>
          <Route path="/contact/:id/details" component={ContactDetailForm}/>
          <Route path="/contacts" component={ContactPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
