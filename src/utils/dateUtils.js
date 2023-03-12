import moment from "moment";

export const formatDateWithSeconds = timestamp => moment(timestamp).format("DD-MM-YYYY HH:mm:ss");

export const formatDateWithoutSeconds = timestamp => moment(timestamp).format("DD-MM-YYYY HH:mm");

export const formatDateWithoutTime = timestamp => moment(timestamp).format("DD-MM-YYYY")

export const getDaysBetweenToday = timestamp => {
    const currentTimestamp = moment(new Date());
    return currentTimestamp.diff(moment(timestamp), "days");
}