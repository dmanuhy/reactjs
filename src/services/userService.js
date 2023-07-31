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

export {
    handleLoginService,
    getAllUserService,
    createUserService,
    deleteUserService,
    updateUserService
}  