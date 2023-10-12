import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    doctorList: [],
    allDoctor: [],
    doctorDetails: {}
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoading = false;
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoading = false;
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoading = false;
            state.roles = [];
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
            console.log(action);
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
        default:
            return state;
    }
}

export default adminReducer;