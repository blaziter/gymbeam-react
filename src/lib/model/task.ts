export type Task = {
    id: string;
    name: string;
    completed: boolean;
    priority?: number;
    dueDate?: Date;
    tags?: string[];
    etc?: string;
};
