import BASE_URL from "../constants/base-url";
import axios from "axios";

export const getAllAssetOrders = (token) => {
    return axios.get(`${BASE_URL}/api/orders`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);

}

export const updateAssignedEmployeeIt = (assignedToEmployeeIt, token, orderId) => {
    return axios.put(`${BASE_URL}/api/orders/${orderId}/assign/${assignedToEmployeeIt}`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const fetchOrderDetails = (orderId, token) => {
    return axios.get(`${BASE_URL}/api/orders/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const changeRemark = (orderId, remark, token) => {
    const body = {remark: remark};
    return axios.put(`${BASE_URL}/api/orders/${orderId}/remark`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const updateOrder = (orderId, body, token) => {
    return axios.put(`${BASE_URL}/api/orders/${orderId}`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const updateOrderWithNewAsset = (orderId, body, token) => {
    return axios.put(`${BASE_URL}/api/orders/${orderId}/new-asset`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}

export const createOrder = (order, token) => {
    return axios.post(`${BASE_URL}/api/orders`, order, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
}