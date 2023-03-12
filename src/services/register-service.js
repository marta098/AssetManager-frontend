import BASE_URL from "../constants/base-url";
import axios from "axios";

export const registerApiCall = userDetails => {
    return axios.post(`${BASE_URL}/api/auth/register`, userDetails)
        .then(response => response.data.accessToken)
}