export interface IRoomDTO {
    id: number; //оставить
    event_id: string;
    name: string; //оставить
    slag: string;
    link: string;
    start_timestamp: string; //оставить
    elapsed_time: string; //оставить
    is_running: boolean; //оставить
    is_ended: boolean; //оставить
    date: string;
    title: string;
    schedule: IScheduleItem[];
}

export interface IScheduleItem {
    id: number;
    item: Item;
    is_active: boolean;
    room_id: string;
    timerange: string[];
}

export interface Item {
    title: string;
    subtitle: string;
    text: string;
    img: string;
}
