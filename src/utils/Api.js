import Axios from "axios";

export class Api {
    static GET(url) {
        return Axios.get(url)
            .then(res => Promise.resolve(res.data))
            .catch(err => {
                console.error(err);
                return Promise.reject(err)
            });
    }

    static POST(url, data) {
        return Axios.post(url, data)
            .then(res => Promise.resolve(res.data))
            .catch(err => {
                console.error(err);
                return Promise.reject(err)
            });
    }
}