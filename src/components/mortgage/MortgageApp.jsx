import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import '../../bootstrap.css';
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent'
import ErrorComponent from './ErrorComponent'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import ListClients from './ListClients'
import LogoutComponent from './LogoutComponent'
import NewClient from './NewClient'
import WelcomeComponent from './WelcomeComponent'


class MortgageApp extends Component {
    render() {
        return (
            <div className="MortgageApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/listclients" component={ListClients}/>
                            <AuthenticatedRoute path="/newclient" component={NewClient}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
               
            </div>
        )
    }
}

export default MortgageApp;