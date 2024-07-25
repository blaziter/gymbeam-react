export type Task = {
    name: string;
    description: string;
    priority?: number;
    dueDate?: Date;
    tags?: string[];
    etc?: string;
};
