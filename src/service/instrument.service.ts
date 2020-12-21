import http from "./http-service";

class InstrumentService {

   
    async autocomplete(query) {
        const resp = await http.get('/instruments/autocomplete/' + query);
        const data = await resp.data;
        return data
    }

    

}

export default new InstrumentService();