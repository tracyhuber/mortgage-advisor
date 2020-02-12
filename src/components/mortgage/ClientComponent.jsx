import React, {Component} from 'react'



class ClientComponent extends Component {
    render() {
        return (
            <div>Client Component for id - {this.props.match.params.id}</div>
        )
    }
}

export default ClientComponent
