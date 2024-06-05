import axios from "axios";

const SITE_BACK = "http://localhost:8000";

const sendData = (BS, lines) => {
    // TODO: here you connect with backend
    axios.get(SITE_BACK + "/api/get_brand_ts", {headers: {"accepts":"application/json"}}).then(data => console.log(data))

}

const getBS = () => {
    return axios.get(SITE_BACK + "/api/get_bs").then(data => data);// await response.json()
}

const updBS = (coords) => {
    axios.post(SITE_BACK + "/api/edit_bs", {headers: {"accepts":"application/json"}, data: coords}).then(data => console.log(data))
    // console.log(coords);
    // for (const i in coords) {
    //     let e = coords[i];
    //     console.log(e);
    // }
}


export {sendData, getBS, updBS};