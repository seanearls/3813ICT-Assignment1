import { User } from "./user";

export interface Channel {
    ID: number;
    cName: string;
    users: User[];
}
