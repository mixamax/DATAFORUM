import { baseUrl, room, roomEvent } from "../constants";
import { IRoomDTO } from "../models/room/room";

interface IError {
    message: string;
}
class Api {
    async get(): Promise<IRoomDTO | IError> {
        const res = await fetch(`${baseUrl}/events/${roomEvent}/rooms/${room}`);

        if (res.ok) {
            return await res.json();
        } else {
            return { message: `${res.status}, HTTP status failed` };
        }
    }
}

export const api = new Api();
