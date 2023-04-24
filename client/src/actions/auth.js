import * as api from '../api/index'
import { AUTH, CREATE_PROFILE } from './constants'


export const signin =(formData, openSnackbar, setLoading, history) => async(dispatch) => {

    try {
        //login the user
        const { data } = await api.signIn(formData)

        dispatch({ type: AUTH, data})
        // setLoading(false)
        openSnackbar("Signin successfull")
        history.push('/reservations')
        //window.location.href="/"

    } catch (error) {
         console.log(error?.response?.data?.message)
         openSnackbar(error?.response?.data?.message)
         setLoading(false)
    }
}

export const signup =(formData, openSnackbar, setLoading, history) => async(dispatch) => {
    try {
        //Sign up the user
        const { data } = await api.signUp(formData)
        console.log(formData, data);
        dispatch({ type: AUTH, data})
        const { info } = await api.createProfile({name: data?.result?.name, email: data?.result?.email, userId: data?.result?._id, phoneNumber: '', businessName: '', contactAddress: '', logo: '', website: ''});
        dispatch({ type: CREATE_PROFILE, payload: info });
        //window.location.href="/"
        history.push('/reservations')
        openSnackbar("Sign up successfull")

    } catch (error) {
        console.log(error)
        openSnackbar(error?.response?.data?.message)
        setLoading(false)
    }
}



export const forgot =(formData) => async(dispatch) => {
    try {
        await api.forgot(formData)
    } catch (error) {
        console.log(error)
    }
}


export const reset =(formData, history) => async(dispatch) => {

    try {
        await api.reset(formData)
        history.push('/reservations')

    } catch (error) {
        alert(error)
    }
}
