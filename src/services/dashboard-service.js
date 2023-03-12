import axios from "axios";
import BASE_URL from "../constants/base-url";

export const fetchWorkload = token => {
    return axios.get(`${BASE_URL}/api/dashboard/workload`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const fetchAssetStatistics = token => {
    return axios.get(`${BASE_URL}/api/dashboard/asset-statistics`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}