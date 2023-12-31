import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
    times: [],
    provinces: [],
    prices: [],
    paymentMethods: [],
    users: [],
    doctorList: [],
    allDoctor: [],
    doctorDetails: {},
    doctorSchedulesByDate: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALLCODE_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SUCCESS:
            switch (action.dataType) {
                case "GENDER": state.genders = action.data;
                    break;
                case "POSITION": state.positions = action.data;
                    break;
                case "ROLE": state.roles = action.data;
                    break;
                case "TIME": state.times = action.data;
                    break;
                case "PROVINCE": state.provinces = action.data;
                    break;
                case "PRICE": state.prices = action.data;
                    break;
                case "PAYMENT": state.paymentMethods = action.data;
                    break;
                default: break;
            }
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_FAILED:
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_START:
            state.isLoading = true;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            state.isLoading = false;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = [];
            state.isLoading = false;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_START:
            state.isLoading = true;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.doctorList = action.doctorList;
            state.isLoading = false;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.doctorList = [];
            state.isLoading = false;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_START:
            state.isLoading = true;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctor = action.allDoctor;
            state.isLoading = false;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctor = [];
            state.isLoading = false;
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_DETAILS_START:
            state.isLoading = true;
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_DETAILS_SUCCESS:
            state.doctorDetails = action.doctorDetails;
            state.isLoading = false;
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_DETAILS_FAILED:
            state.doctorDetails = {};
            state.isLoading = false;
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_SCHEDULE_BY_DATE_START:
            state.isLoading = true;
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_SCHEDULE_BY_DATE_SUCCESS:
            state.doctorSchedulesByDate = action.doctorSchedules;
            state.isLoading = false;
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_SCHEDULE_BY_DATE_FAILED:
            state.doctorSchedulesByDate = []
            state.isLoading = false;
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;