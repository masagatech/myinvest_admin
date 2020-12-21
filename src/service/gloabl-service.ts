import UserModel from '../model/user'

class GlobalService {


    getUser(): UserModel {
        const user = localStorage.getItem("_user")
        let userd: UserModel
        userd = {
            email: "",
            id: "",
            name: "",
            token: ""
        }
        if (user) {
            userd = JSON.parse(user);
        }
        return userd
    }

    setUser(user: UserModel) {
        
        localStorage.setItem("_user", JSON.stringify(user))
    }


    logOut() {
        this.setUser({})
    }

}




export default new GlobalService();