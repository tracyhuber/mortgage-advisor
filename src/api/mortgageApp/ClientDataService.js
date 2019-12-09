import axios from 'axios'

class ClientDataService {
    retrieveAllClients(name) {
        return axios.get(`http://localhost:8080/users/${name}/clients`);
    }

}

export default new ClientDataService() 