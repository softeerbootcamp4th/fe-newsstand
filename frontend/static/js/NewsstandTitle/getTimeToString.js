import { dateFormatter } from "../utils/dateFormatter.js";

export function getTimetoString(format) {
    const currentTime = new Date();
    return dateFormatter(currentTime, format);
}
