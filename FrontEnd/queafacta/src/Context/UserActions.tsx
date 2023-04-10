import { API_URL } from "../Util/util";
import axios from "axios";
import jwt_decode from 'jwt-decode'

export async function loginUser(dispatch:any, loginDetails:any) {
    let response = null
    let responseData = null
    try{
        const body = { username: loginDetails.email, password: loginDetails.password };
        response = await axios.post(API_URL +'users/login', body);
        const { token } = response.data;
        responseData = jwt_decode(token);
    } catch(error) {
        return error;
    }

    window.localStorage.setItem("currentUser", JSON.stringify(responseData));
    dispatch(responseData)
    return responseData;
}

export async function registerUser(dispatch:any, userDetails:any) {
    let response = null

    if(validateStrongPassword(userDetails.password) === false){
        throw new Error("Password is not strong enough");
    } else {
        try{
            const body = { username: userDetails.email, password: userDetails.password };
            response = await axios.post(API_URL +'users/register', body);
            window.localStorage.setItem("currentUser", JSON.stringify(response.data));
            dispatch(response.data);
        } catch(error) {
            throw error;
        }
    
    }

    return response;
}

export async function getUserInformation(userID:any) {
    let response = null
    try{
        response = await axios.get(API_URL +`users/information/${userID}`);
        return response.data;
    } catch(error) {
        throw error;
    }
}

export async function editUserInformation(userDetails:any, userID:any) {
    const body = {firstName: userDetails.firstname,
                    lastName: userDetails.lastname,
                    gender: userDetails.gender,
                    dob: userDetails.dob,
                    address1: userDetails.sa1,
                    address2: userDetails.sa2,
                    postCode: userDetails.postcode,
                    country: userDetails.country,
                    state: userDetails.state,
                    phone: userDetails.mobile,
                    email: userDetails.email}

    await axios.put(API_URL +`users/${userID}`, body);
}
   
export async function logout(dispatch: Function) {
    dispatch(null);
    localStorage.removeItem('currentUser');
}

function validateStrongPassword(password:string): boolean{
    let isStrong = false;
    /**
     * Validates Strength of password
     * according to 
     * https://www.pcmag.com/encyclopedia/term/strong-password
     * with large number of characters (minimum 6)
     * and a mixture of upper, lower case and special characters.
     * 
     * Checks if it contains one of each and a minimum of 6 characters.
     **/ 
     if (/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/.test(password)){
        isStrong = true;
    }

    return isStrong
}