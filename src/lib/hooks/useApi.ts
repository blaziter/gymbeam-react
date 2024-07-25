import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosClient } from '@lib/client/axios';
import { List } from '@lib/model';

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

type CreateListBodyDto = Omit<List, 'id' | 'createdAt'>;

type UpdateListBodyDto = Omit<List, 'createdAt'>;

type DeleteListParamsDto = Pick<List, 'id'>;

export class todoListApi {
    public static getAllLists = () => {
        return request<FindAllListsResponseDto[]>({
            url: '/todo-list',
            method: 'GET',
        });
    };

    public static getOneList = (id: string) => {
        return request<FindListResponseDto>({
            url: `/todo-list/${id}`,
            method: 'GET',
        });
    };

    public static createList = (data: CreateListBodyDto) => {
        return request({
            url: '/todo-list',
            method: 'POST',
            data,
        });
    };

    public static updateList = (data: UpdateListBodyDto) => {
        return request({
            url: `/todo-list/${data.id}`,
            method: 'PUT',
            data,
        });
    };

    public static deleteList = ({ id }: DeleteListParamsDto) => {
        return request({
            url: `/todo-list/${id}`,
            method: 'DELETE',
        });
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
    return axiosClient.request({
        url,
        method,
        data,
        params,
        headers,
    });
};
