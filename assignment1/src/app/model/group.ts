import { Channel } from "./channel";
import { User } from "./user";

export interface Group {
    ID: number;
    gName: string;
    users: User[];
    assistants: string[];
    channel: Channel[];
}
