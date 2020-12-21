import axios from "axios";
import GlobalService from "@/service/gloabl-service"

class HttpReq {

    get(url) {

        return axios.create({
            baseURL: "http://localhost:8009/api/v1",
            headers: {
                "Authorization": "Bearer " + this.getToken(),
                "Content-type": "application/json"
            }
        }).get(url);
    }


    post(url, params) {
        return axios.create({
            baseURL: "http://localhost:8009/api/v1",
            headers: {
                "Authorization": "Bearer " + this.getToken(),
                "Content-type": "application/json"
            }
        }).post(url, params);
    }

    put(url, params) {
        return axios.create({
            baseURL: "http://localhost:8009/api/v1",
            headers: {
                "Authorization": "Bearer " + this.getToken(),
                "Content-type": "application/json"
            }
        }).put(url, params);
    }

    delete(url) {
        return axios.create({
            baseURL: "http://localhost:8009/api/v1",
            headers: {
                "Authorization": "Bearer " + this.getToken(),
                "Content-type": "application/json"
            }
        }).delete(url);
    }

    private getToken() {
        const loginUser = GlobalService.getUser()
        if (loginUser.id) {
            return loginUser.token;
        }
        return "";
    }

}

export default new HttpReq();


// export default axios.create({
//     baseURL: "http://localhost:8080/api",
//     headers: {
//         "Content-type": "application/json"
//     }
// }); 