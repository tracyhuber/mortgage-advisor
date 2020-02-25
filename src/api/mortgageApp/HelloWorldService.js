import Axios from "axios"


class HelloWorldService {
    executeHelloWorldService() {
        return Axios.get('http://localhost:8080/hello-world')
        //console.log('executed service')
    }

    executeHelloWorldBeanService() {
        return Axios.get('http://localhost:8080/hello-world-bean')

    }

    executeHelloWorldPathVariableService(name) {
        let username = 'Tracy'
        let password = 'silly'

        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

        return Axios.get(`http://localhost:8080/hello-world/path-variable/${name}`
            , {headers: {authorization: basicAuthHeader}} );
    }
}

export default new HelloWorldService()