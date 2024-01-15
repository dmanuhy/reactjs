import axios from "../axios"

const createSpecialtyService = (data) => {
    return axios.post('/api/specialty/create', data);
}

export {
    createSpecialtyService
}  