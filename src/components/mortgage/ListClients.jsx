import React, {Component} from 'react'
import ClientDataService from '../../api/mortgageApp/ClientDataService.js'
import AuthenticationService from './AuthenticationService.js'



class ListClients extends Component {
    constructor(props){
        super(props)
        this.state = {
            clients : 
            [
            // {id: 1, name: 'Micky Mouse', description: 'purchase', done: false, targetDate: new Date()},
            // {id: 2, name: 'Lauren Ladybug', description: 'refinance', done: false, targetDate: new Date()},
            // {id: 3, name: 'Punch Buggy', description: 'prospect', done: false, targetDate: new Date()}
            ]
        }
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName
        ClientDataService.retrieveAllClients(username)
            .then(
                response => {
                    //console.log(response)
                    this.setState({clients : response.data})
                }
            )
    
}

    render() {
        return (
            <div>
                <h1>List Clients</h1>
                <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Is Completed</th>
                            <th>Target Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.clients.map (
                                client =>
                                    <tr key={client.id}>
                                        <td>{client.id}</td>
                                        <td>{client.username}</td>
                                        <td>{client.description}</td>
                                        <td>{client.done.toString()}</td>
                                        <td>{client.targetDate.toString()}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}

export default ListClients
