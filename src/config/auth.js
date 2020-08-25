import Pw from './pw';

class Auth {

    adminLogin = {
        username: Pw.adminLogin.username,
        password: Pw.adminLogin.password
    }

    constructor() {
        this.authenticated = false;
    }

    login(cb) {
        sessionStorage.setItem('loggedIn', true)
        cb();
    }

    logout(cb) {
        sessionStorage.setItem('loggedIn', false)
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }

}

export default new Auth();