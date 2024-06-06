import axios from "axios";

const SITE_BACK = "http://localhost:8000";

const updRoute = (BS, lines) => {
    // TODO: here you connect with backend
    axios.post(SITE_BACK + "/api/add_route", {data: lines}).then(data => console.log(data))
}

const getRoute = () => {
    return axios.get(SITE_BACK + "/api/get_route").then(data => data);
}

const getBS = () => {
    return axios.get(SITE_BACK + "/api/get_bs").then(data => data);// await response.json()
}

const updBS = (coords) => {
    axios.post(SITE_BACK + "/api/edit_bs", {data: coords}).then(data => console.log(data))

}


export {updRoute, getBS, updBS, getRoute};