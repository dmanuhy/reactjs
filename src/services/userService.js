import axios from "../axios"

const handleLoginService = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUserService = (inputID) => {
    return axios.get(`/api/get-all-user?id=${inputID}`,);
}

const createUserService = (userData) => {
    return axios.post('/api/create-user', userData);
}

const deleteUserService = (userID) => {
    return axios.delete('/api/delete-user', { data: { id: userID } });
}

const updateUserService = (userData) => {
    return axios.put('/api/edit-user', userData);
}

const getTopDoctorService = (limitInput) => {
    return axios.get(`/api/get-top-doctor?limitInput=${limitInput}`);
}

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctor`);
}

const saveDoctorInfoService = (data) => {
    return axios.post(`/api/save-doctor-info`, data);
}

export {
    handleLoginService,
    getAllUserService,
    createUserService,
    deleteUserService,
    updateUserService,
    getTopDoctorService,
    getAllDoctorService,
    saveDoctorInfoService
}  