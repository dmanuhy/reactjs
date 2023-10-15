import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/allCodeService';
import {
    createUserService, getAllUserService, deleteUserService, updateUserService,
    getTopDoctorService, getAllDoctorService, saveDoctorInfoService, getDoctorDetailsService,
    createDoctorScheduleService
} from '../../services/userService';
import { toast } from 'react-toastify';


export const fetchAllcodeStart = (type) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALLCODE_START })
            let res = await getAllCodeService(type);
            if (res && res.errorCode === 0) {
                dispatch(fetchAllcodeSuccess(res.data, type));
            }
            else {
                dispatch(fetchAllcodeFailed());
            }
        } catch (e) {
            dispatch(fetchAllcodeFailed())
            console.log("fetch start: ", e)
        }
    }

}
export const fetchAllcodeSuccess = (allcodeData, allcodeType) => ({
    type: actionTypes.FETCH_ALLCODE_SUCCESS,
    data: allcodeData,
    dataType: allcodeType
})
export const fetchAllcodeFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

//--MANAGE USER--

//Create user
export const createUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_USER_SUCCESS })
            let res = await createUserService(data);
            if (res && res.errorCode === 0) {
                toast.success("New user created successfully !")
                dispatch(createUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                dispatch(createUserFailed());
                toast.error("Can't created new user because of an ERROR !");
            }
        } catch (e) {
            dispatch(createUserFailed())
            console.log("fetch start: ", e)
        }
    }
}
export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

//Get all user
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_USER_START })
            let res = await getAllUserService("all");
            if (res && res.errorCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            }
            else {
                dispatch(fetchAllUserFailed());
                toast.error("An ERROR occurred when get User List !");
            }
        } catch (e) {
            dispatch(fetchAllUserFailed())
            console.log("fetch start: ", e)
        }
    }
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

//Delete a user
export const deleteUserStart = (userID) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userID);
            if (res && res.errorCode === 0) {
                toast.success("An user was deleted successfully !");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error("Can't delete because of an ERROR !");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(fetchAllUserFailed())
            toast.error("Can't delete because of an ERROR !");
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

//update user
export const updateUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateUserService(data);
            if (res && res.errorCode === 0) {
                toast.success("An account have been changed !");
                dispatch(updateUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error("Updated account failed !");
                dispatch(updateUserFailed());
            }
        } catch (e) {
            dispatch(fetchAllUserFailed())
            toast.error("Can't update because of an ERROR !");
        }
    }
}
export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
})
export const updateUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED
})

//read top docctor
export const fetchTopDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_START });
            let res = await getTopDoctorService(10);
            if (res && res.errorCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            }
            else {
                console.log('FETCH_TOP_DOCTOR_FAILED:', res.message)
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}
export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    doctorList: data
})
export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
})

//read all docctor
export const fetchAllDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_START });
            let res = await getAllDoctorService();
            if (res && res.errorCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.data));
            }
            else {
                console.log('FETCH_ALL_DOCTOR_FAILED:', res.message)
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                })
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}
export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    allDoctor: data
})
export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
})

//CREATE doctor info
export const saveDoctorInfoStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDoctorInfoService(data);
            if (res && res.errorCode === 0) {
                toast.success("Saved doctor information!");
                dispatch(saveDoctorInfoSuccess());
            }
            else {
                toast.error("Error occured in service when saving!");
                dispatch({
                    type: actionTypes.SAVE_DOCTOR_INFO_FAILED
                })
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}
export const saveDoctorInfoSuccess = () => ({
    type: actionTypes.SAVE_DOCTOR_INFO_SUCCESS,
})
export const saveDoctorInfoFailed = () => ({
    type: actionTypes.SAVE_DOCTOR_INFO_FAILED,
})

export const fetchDoctorDetailsStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_DOCTOR_DETAILS_START });
            let res = await getDoctorDetailsService(data);
            if (res && res.errorCode === 0) {
                dispatch(fetchDoctorDetailsSuccess(res.data));
            }
            else {
                toast.error("Error occured in service!");
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                })
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}
export const fetchDoctorDetailsSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_DETAILS_SUCCESS,
    doctorDetails: data
})
export const fetchDoctorDetailsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
})

export const createDoctorScheduleStart = (data) => {
    return async () => {
        try {
            let res = await createDoctorScheduleService(data);
            if (res && res.errorCode === 0) {
                toast.success(res.message);
            }
            else {
                toast.error(res.message || "Error from server");
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}

