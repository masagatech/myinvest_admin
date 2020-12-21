import http from "./http-service";

class BrokerService {


    async get(userid) {
        const resp = await http.get('/broker/get/' + userid);
        const data = await resp.data;
        return data
    }

    async login(req) {
        const resp = await http.post('/broker/login', req);
        const data = await resp.data;
        return data
    }



}

export default new BrokerService();