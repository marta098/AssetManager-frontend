import axios from "axios";
import BASE_URL from "../constants/base-url";

export const fetchAllMpkNumbers = token => {
    return axios.get(`${BASE_URL}/api/mpks`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const fetchAllLocations = token => {
    return axios.get(`${BASE_URL}/api/locations`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const fetchLocations = (token) => {
    return axios.get(`${BASE_URL}/api/locations`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const fetchStockrooms = (token) => {
    return axios.get(`${BASE_URL}/api/stockrooms`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const fetchCrestCodeGlobalVariable = (token) => {
    return axios.get(`${BASE_URL}/api/variables/crest-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const fetchDeprecationGlobalVariable = (token) => {
    return axios.get(`${BASE_URL}/api/variables/deprecation-months`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}


export const updateDeprecation = (body, token) => {
    return axios.put(`${BASE_URL}/api/variables/deprecation-months`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const updateCrestCode = (body, token) => {
    return axios.put(`${BASE_URL}/api/variables/crest-code`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
