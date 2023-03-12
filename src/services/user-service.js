import BASE_URL from "../constants/base-url";
import axios from "axios";

export const fetchAllUsers = (token) => {
    return axios.get(`${BASE_URL}/api/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const fetchAllUsersWithRole = (role, token) => {
    return axios.get(`${BASE_URL}/api/users/${role}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const deleteUser = (token, userId) => {
    return axios.delete(`${BASE_URL}/api/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const changeRole = (token, userId, role) => {
    return axios.put(`${BASE_URL}/api/users/${userId}/roles`, {role: role}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const fetchAllUsersOrders = (userId, token) => {
    return axios.get(`${BASE_URL}/api/users/${userId}/orders`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const fetchAllOrdersCreatedByUser = (userId, token) => {
    return axios.get(`${BASE_URL}/api/users/${userId}/created-orders`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}