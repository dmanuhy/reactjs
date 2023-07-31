import axios from "../axios"

const getAllCodeService = (inputType) => {
    return axios.get(`/api/get-all-code?type=${inputType}`);
}
export {
    getAllCodeService
}  