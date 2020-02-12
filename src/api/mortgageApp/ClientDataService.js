import axios from 'axios'

class ClientDataService {
    retrieveAllClients(name) {
        return axios.get(`http://localhost:8080/users/${name}/clients`);
    }

    deleteClient(name, id) {
        return axios.delete(`http://localhost:8080/users/${name}/clients/${id}`);

    }

}

export default new ClientDataService() 