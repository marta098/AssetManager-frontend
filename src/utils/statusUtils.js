export const statuses = ["NEW", "HANDED_FOR_COMPLETION", "ALLOCATED", "IN_PREPARATION", "SENT", "COMPLETED"];

export const getStatusValue = status => {
    return statuses.findIndex(defaultStatus => defaultStatus === status);
}

export const isChecked = (status, currentStatus) => {
    return getStatusValue(currentStatus) >= getStatusValue(status);
}

export const isCompleted = (status) => status === "COMPLETED";

export const getStatusArray = (deliveryType) => [
    {key: "NEW", value: "Nowy"},
    {key: "HANDED_FOR_COMPLETION", value: "Przekazano do realizacji"},
    {key: "ALLOCATED", value: "Przydzielono urządzenie"},
    {key: "IN_PREPARATION", value: "W przygotowaniu"},
    {key: "SENT", value: deliveryType === "SHIPMENT" ? "Wysłany" : "Gotowy do odbioru"},
    {key: "COMPLETED", value: "Zakończone"},
];
export const getDeliveryTypeArray = (deliveryType) => [
    {key: "SHIPMENT", value: "Wysyłka"},
    {key: "PICKUP", value: "Odbiór osobisty"}

];
export const statusMap = new Map([
    ["NEW", "Nowy"],
    ["HANDED_FOR_COMPLETION", "Przekazano do realizacji"],
    ["ALLOCATED", "Przydzielono urządzenie"],
    ["IN_PREPARATION", "W przygotowaniu"],
    ["SENT", "Wysłany"],
    ["COMPLETED", "Zakończone"]
])

export const getTranslatedStatus = (status, deliveryType) => {
    if (status === "SENT") {
        return deliveryType === "SHIPMENT" ? "Wysłany" : "Gotowy do odbioru";
    }
    return statusMap.get(status);
}

export const assetStatusMap = new Map([
    ["IN_USE", "W użyciu"],
    ["IN_STOCK", "W magazynie"],
])

export const getAssetTranslatedStatus = status => assetStatusMap.get(status);