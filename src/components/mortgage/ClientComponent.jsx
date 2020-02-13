import React, {Component} from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ClientDataService from '../../api/mortgageApp/ClientDataService.js'
import AuthenticationService from './AuthenticationService.js'


class ClientComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id : this.props.match.params.id,
            clientName: '',
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        if(this.state.id===-1) {
            return 
        }
        
        let username = AuthenticationService.getLoggedInUserName()
        
        ClientDataService.retrieveClient(username, this.state.id)
            .then(response => this.setState({
                clientName: response.data.clientName,
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    validate(values) {
        let errors = {}
        if(!values.clientName) {
            errors.clientName = 'Enter a Name'
        }

        if(!values.description) {
            errors.description = 'Enter a Description'
        } else if(values.description.length<5) {
            errors.description = 'Enter at least 5 characters in description'
        }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid target date'
        }

        console.log(values)
        return errors

    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()
        
        let client = {
            id: this.state.id,
            clientName: values.clientName,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            ClientDataService.createClient(username, client)
                .then(() => this.props.history.push('/listclients'))
        } else {
            ClientDataService.updateClient(username, this.state.id, client)
                .then(() => this.props.history.push('/listclients'))
        }
        console.log(values)
    }
    

    render() {
        let {clientName, description, targetDate} = this.state
        //let targetDate = this.state.targetDate

        return (
            <div>
                <h1>Client</h1>
                <div className="container">
                    <Formik
                        initialValues={{clientName, description, targetDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="clientName" component="div" 
                                            className="alert alert-warning"/>
                                    <ErrorMessage name="description" component="div" 
                                            className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" 
                                            className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Client Name</label>
                                        <Field className="form-control" type="text" name="clientName"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                                
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default ClientComponent
