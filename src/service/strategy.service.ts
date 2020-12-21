import http from "./http-service";

class StrategyService {

    async upsert(req) {
        const resp = await http.post('/strategy/upsert', req);
        const data = await resp.data;
        return data
    } 

    async get(query) {
        const resp = await http.get('/strategy/get' + query);
        const data = await resp.data;
        return data
    }

    async delete(id) {
        const resp = await http.delete('/strategy/' + id);
        const data = await resp.data;
        return data
    }

    async edit(id) {
        const resp = await http.get('/strategy/edit/' + id);
        const data = await resp.data;
        return data
    }

    async start(id) {
        const resp = await http.get('/strategy/start/' + id);
        const data = await resp.data;
        return data
    }

    

}

export default new StrategyService();