import { Task } from './task';

export type List = {
    id: string;
    createdat: Date;
    name: string;
    tasks: Task[];
    color: string;
};
