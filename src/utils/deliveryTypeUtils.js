export const translateDeliveryType = deliveryType => {
    switch (deliveryType) {
        case "SHIPMENT":
            return "Wysyłka";
        case "PICKUP":
            return "Odbiór osobisty";
        default:
            return "Delivery type not found";
    }
}

export const deliveryTypeMap = [
    {key: "SHIPMENT", value: "Wysyłka"},
    {key: "PICKUP", value: "Odbiór osobisty"}
]