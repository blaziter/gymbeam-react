import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosClient } from '@lib/client/axios';
import { List, Task } from '@lib/model';

export const useApi = <
    QueryFnData = unknown,
    TData = QueryFnData,
    TError = UseQueryError,
    QueryKey extends Record<any, any> = object,
>(
    key: QueryKey,
    fn: QueryFn<TData>
): UseQueryResult<TData, TError> => {
    return useQuery<TData, TError>({
        queryKey: [key[0], key[1]],
        queryFn: async (props) => (await fn(props)).data as TData,
    });
};

type FindAllListsResponseDto = List;

type FindListResponseDto = List;

type CreateListBodyDto = {
    name: string;
};

type UpdateListBodyDto = CreateListBodyDto;

type FindAllTasksParamsDto = {
    listId: string;
};

type FindAllTasksResponseDto = Array<Task>;

type FindTaskResponseDto = Omit<CreateTaskBodyDto, 'dueDate' | 'tags'> & {
    tags: string[];
    dueDate: Date;
};

type CreateTaskBodyDto = {
    name?: string;
    completed?: boolean;
    priority?: string;
    dueDate: Date;
    tags?: string[];
    etc?: string;
};

type UpdateTaskBodyDto = Omit<CreateTaskBodyDto, 'dueDate'> & {
    dueDate?: Date;
};

export class todoListApi {
    public static getAllLists = {
        key: 'get-lists',
        call: () => {
            return request<FindAllListsResponseDto[]>({
                url: '/todo-list',
                method: 'GET',
            });
        },
    };

    public static getOneList = {
        key: 'get-list',
        call: ({ listId }: { listId: string }) => {
            return request<FindListResponseDto>({
                url: `/todo-list/${listId}`,
                method: 'GET',
            });
        },
    };

    public static createList = {
        key: 'create-list',
        call: (data: CreateListBodyDto) => {
            return request({
                url: '/todo-list',
                method: 'POST',
                data,
            });
        },
    };

    public static updateList = {
        key: 'update-list',
        call: ({ listId }: { listId: string }, data: UpdateListBodyDto) => {
            return request({
                url: `/todo-list/${listId}`,
                method: 'PUT',
                data,
            });
        },
    };

    public static deleteList = {
        key: 'delete-list',
        call: ({ listId }: { listId: string }) => {
            return request({
                url: `/todo-list/${listId}`,
                method: 'DELETE',
            });
        },
    };

    public static getAllTasks = {
        key: 'get-tasks',
        call: ({ listId }: FindAllTasksParamsDto) => {
            return request<FindAllTasksResponseDto>({
                url: `/todo-list/${listId}/tasks`,
                method: 'GET',
            });
        },
    };

    public static getTask = {
        key: 'get-task',
        call: ({ listId, taskId }: { listId: string; taskId: string }) => {
            return request<FindTaskResponseDto>({
                url: `/todo-list/${listId}/tasks/${taskId}`,
                method: 'GET',
            });
        },
    };

    public static createTask = {
        key: 'create-task',
        call: ({ listId }: { listId: string }, data: CreateTaskBodyDto) => {
            return request({
                url: `/todo-list/${listId}/tasks`,
                method: 'POST',
                data,
            });
        },
    };

    public static updateTask = {
        key: 'update-task',
        call: (
            { listId, taskId }: { listId: string; taskId: string },
            data: UpdateTaskBodyDto
        ) => {
            return request({
                url: `/todo-list/${listId}/tasks/${taskId}`,
                method: 'PUT',
                data,
            });
        },
    };

    public static deleteTask = {
        key: 'delete-task',
        call: ({ listId, taskId }: { listId: string; taskId: string }) => {
            return request({
                url: `/todo-list/${listId}/tasks/${taskId}`,
                method: 'DELETE',
            });
        },
    };
}

type QueryFn<T = unknown> = (
    props: any
) => AxiosResponse<T> | Promise<AxiosResponse<T>>;

type UseQueryError = {
    statusCode?: number;
    message?: string;
    errorText?: string;
    type?: string;
};

type RequestParams = {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    params?: any;
    headers?: any;
};

const request = async <T = any>({
    url,
    method,
    data,
    params,
    headers,
}: RequestParams): Promise<AxiosResponse<T>> => {
    if (url.includes('undefined'))
        return Promise.resolve({} as AxiosResponse<T>);

    return axiosClient.request({
        url,
        method,
        data,
        params,
        headers,
    });
};
