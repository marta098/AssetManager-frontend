export const models = ["LARGE_LAPTOP", "SMALL_LAPTOP", "DESKTOP_PC"];

export const getModelArray = () => [
    {key: "LARGE_LAPTOP", value: "Duży laptop"},
    {key: "SMALL_LAPTOP", value: "Mały laptop"},
    {key: "DESKTOP_PC", value: "Komputer stacjonarny"}
];

export const modelMap = new Map([
    ["LARGE_LAPTOP", "Duży laptop"],
    ["SMALL_LAPTOP", "Mały laptop"],
    ["DESKTOP_PC", "Komputer stacjonarny"]
])

export const getTranslatedModel = model => modelMap.get(model);
