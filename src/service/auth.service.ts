import http from "./http-service";

class AuthService  {

    async login(req) {
        const resp = await http.post('/auth', req);
        const data = await resp.data;
        return data
    }


}




export default new AuthService();