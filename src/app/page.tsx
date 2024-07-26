'use client';

import { TodoListTable } from './_components';

export default function Home() {
    return (
        <main className='min-h-screen p-8 lg:p-24'>
            <TodoListTable />
        </main>
    );
}
