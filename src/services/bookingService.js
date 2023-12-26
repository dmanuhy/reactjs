import axios from "../axios"

const bookAppointment = (data) => {
    return axios.post('/api/book-appointment', data);
}
export {
    bookAppointment
}  