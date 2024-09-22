import { api } from "../../api/api";

export const getData = async () => {
    try {
        const data = await api.get();
        if ("message" in data) {
            return null;
        }
        return data;
    } catch (e) {
        console.log(e);
        return null;
    }
};
