import { Channel } from "./channel";
import { User } from "./user";

export interface Group {
    ID: number;
    gName: string;
    users: User[];
    channel: Channel[];
}
