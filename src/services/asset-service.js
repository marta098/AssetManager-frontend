import BASE_URL from "../constants/base-url";
import axios from "axios";

export const fetchAllUsersAssets = (userId, token) => {
    return axios.get(`${BASE_URL}/api/assets/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const fetchAssetDetails = (assetId, token) => {
    return axios.get(`${BASE_URL}/api/assets/${assetId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const fetchSerialNumberDetails = (serialNumber, token) => {
    return axios.get(`${BASE_URL}/api/assets/serial-numbers/${serialNumber}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const fetchAllModels = (token) => {
    return axios.get(`${BASE_URL}/api/models`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const fetchAllAssets = (token) => {
    return axios.get(`${BASE_URL}/api/assets`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);

}

export const updateAsset = (assetId, body, token) => {
    return axios.put(`${BASE_URL}/api/assets/${assetId}`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const fetchOrderHistory = (assetId, token) => {
    return axios.get(`${BASE_URL}/api/assets/asset-id/${assetId}/orders-history`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}
