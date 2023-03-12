import BASE_URL from "../constants/base-url";
import axios from "axios";

export const login = credentials => {
    return axios.post(`${BASE_URL}/api/auth/login`, credentials)
        .then(response => response.data.accessToken)
}