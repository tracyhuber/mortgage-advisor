import React, {Component} from 'react'
import ClientDataService from '../../api/mortgageApp/ClientDataService.js'
import AuthenticationService from './AuthenticationService.js'



class ListClients extends Component {
    constructor(props){
        super(props)
        this.state = {
            clients : [],
            //[
            // {id: 1, name: 'Micky Mouse', description: 'purchase', done: false, targetDate: new Date()},
            // {id: 2, name: 'Lauren Ladybug', description: 'refinance', done: false, targetDate: new Date()},
            // {id: 3, name: 'Punch Buggy', description: 'prospect', done: false, targetDate: new Date()}
            //]
            message : null
        }
        this.updateClientClicked = this.updateClientClicked.bind(this)
        this.deleteClientClicked = this.deleteClientClicked.bind(this)
        this.refreshClients = this.refreshClients.bind(this)
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshClients();
        console.log(this.state)
    }

    refreshClients() {
        let username = AuthenticationService.getLoggedInUserName
        ClientDataService.retrieveAllClients(username)
            .then(
                response => {
                    //console.log(response)
                    this.setState({clients : response.data})
                }
            )
    }

    deleteClientClicked(id){
        let username = AuthenticationService.getLoggedInUserName()
        ClientDataService.deleteClient(username, id)
            .then (
                response => {
                    this.setState({message : `Delete of client ${id} successful`})
                    this.refreshClients()
                }
        )
        //console.log(id + " " + username);
    }

    updateClientClicked(id){
        console.log('update ' + id)
        this.props.history.push(`/clients/${id}`)
        // let username = AuthenticationService.getLoggedInUserName()
        // ClientDataService.deleteClient(username, id)
        //     .then (
        //         response => {
        //             this.setState({message : `Delete of client ${id} successful`})
        //             this.refreshClients()
        //         }
        // )
        //console.log(id + " " + username);
    }

    render() {
        console.log('render')
        return (
            <div>
                <h1>List Clients</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Is Completed</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
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
                                        <td><button className="btn btn-success" onClick={() => this.updateClientClicked(client.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteClientClicked(client.id)}>Delete</button></td>
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
