import React from 'react'
import { Header } from '@amsterdam/asc-ui'
import { HomePage } from './page/Home'
import './App.scss'
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'
import { ContactPage } from './page/Contacts'
import { SchoolPage } from './page/Schools'
import { ContactForm } from './elements/form/form_contact'
import { ContactDetailForm } from './elements/form/form_contact_detail'
import moment from 'moment'
import 'moment/locale/nl'
import { SchoolDetailForm } from './elements/form/form_school_detail'
const App = () => {
  moment.locale("nl")
  return (
    <div className="App">
      
      <BrowserRouter>
        <Header tall={false} title="Service centrum Onderwijs" fullWidth={false} homeLink="" />
        <ul className="menu-item-ul">
          <li className="menu-item-li"><NavLink className="menu-item" exact activeClassName="active" to="/">Notities</NavLink></li>
          <li className="menu-item-li"><NavLink className="menu-item" activeClassName="active" to="/schools">Scholen</NavLink></li>
          <li className="menu-item-li"><NavLink className="menu-item" activeClassName="active" to="/contacts">Contacten</NavLink></li>
        </ul>
        <Switch>
          <Route path="/schools" component={SchoolPage}/>
          <Route path="/school/:id" exact component={SchoolDetailForm}/>
          <Route path="/contacts/new" exact component={ContactForm}/>
          <Route path="/contact/:id" exact component={ContactDetailForm}/>
          <Route path="/contacts" component={ContactPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
