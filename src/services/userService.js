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

const saveDoctorDetailService = (data) => {
    return axios.post(`/api/save-doctor-detail`, data);
}

const getDoctorDetailsService = (inputID) => {
    return axios.get(`/api/get-doctor-detail?id=${inputID}`);
}

const createDoctorScheduleService = (data) => {
    return axios.post(`/api/create-doctor-schedule`, data)
}
const getDoctorScheduleByDateService = (inputID, date) => {
    return axios.get(`/api/get-doctor-schedule-by-date?doctorID=${inputID}&date=${date}`);
}
export {
    handleLoginService,
    getAllUserService,
    createUserService,
    deleteUserService,
    updateUserService,
    getTopDoctorService,
    getAllDoctorService,
    saveDoctorDetailService,
    getDoctorDetailsService,
    createDoctorScheduleService,
    getDoctorScheduleByDateService
}  