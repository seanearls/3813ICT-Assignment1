import { User } from "./user";

export interface Channel {
    chanID: number;
    groupID: number;
    cName: string;
    messages: [];
    users: User[];
}
