import axios from "../axios"

const bookAppointment = (data) => {
    return axios.post('/api/book-appointment', data);
}

const verifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data);
}

export {
    bookAppointment,
    verifyBookAppointment
}  