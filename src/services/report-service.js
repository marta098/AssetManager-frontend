import BASE_URL from "../constants/base-url";
import axios from "axios";

export const getAllReports = token => {
    return axios.get(`${BASE_URL}/api/reports`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const generateReport = token => {
    return axios.post(`${BASE_URL}/api/reports`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const getReportById = (token, id) => {
    return axios.get(`${BASE_URL}/api/reports/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
    });
}

export const fetchLastReportDate = token => {
    return axios.get(`${BASE_URL}/api/reports/last-report-date`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}