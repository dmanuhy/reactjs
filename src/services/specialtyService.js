import axios from "../axios"

const createSpecialtyService = (data) => {
    return axios.post('/api/specialty/create', data);
}

const getAllSpecialtyService = () => {
    return axios.get('/api/specialty/get-all');
}

export {
    createSpecialtyService,
    getAllSpecialtyService
}  