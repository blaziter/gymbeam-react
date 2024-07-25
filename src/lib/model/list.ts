import { UUID } from 'crypto';

import { Task } from './task';

export type List = {
    id: UUID;
    createdat: Date;
    name: string;
    tasks: Task[];
    color: string;
};
