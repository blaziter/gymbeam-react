import { TasksList } from '@components';

export default function List({
    params,
}: {
    params: { taskId: string; listId: string };
}) {
    return (
        <main className='min-h-screen p-8 lg:p-24'>
            <h1>List</h1>
            <TasksList listId={params.listId} />
        </main>
    );
}
