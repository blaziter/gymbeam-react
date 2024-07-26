export type Task = {
    id: string;
    name: string;
    completed: boolean;
    priority: string;
    dueDate: Date;
    tags?: string[];
    etc: string;
};
