import {api} from './api';
import {useInfiniteQuery, useMutation, useQuery, useQueryClient, UseQueryOptions} from 'react-query';
import {QueryFunctionContext} from 'react-query/types/core/types';
import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

type QueryKeyT = [string, object | undefined];

interface Pagination {
  totalCnt: number;
  currentPage: number;
  hasMore: boolean;
}

export interface GetInfinitePagesInterface<T> {
  data: T;
  pagination: Pagination;
}

export const fetcher = <T>({
                             queryKey,
                             pageParam,
                             config
                           }: QueryFunctionContext<QueryKeyT> & {
  config?: AxiosRequestConfig;
}): Promise<T> => {
  const [url, params] = queryKey;
  return api
    .get<T>(url, {params: {...params, ...pageParam}}, config)
    .then((res) => res.data);
};

export const useLoadMore = <T>(
  url: string | null,
  params?: object,
  config?: AxiosRequestConfig
) => {
  const context = useInfiniteQuery<
    GetInfinitePagesInterface<T>,
    Error,
    GetInfinitePagesInterface<T>,
    QueryKeyT
  >(
    [url!, params],
    ({
       queryKey, pageParam = {
        page: 1
      }
     }) =>
      fetcher({queryKey, pageParam, meta: {}, config}),
    {
      getNextPageParam: ({pagination}) => {
        if (pagination.hasMore) {
          return {page: pagination.currentPage + 1};
        }
        return false;
      }
    }
  );

  return context;
};

export const usePrefetch = <T>(
  url: string | null,
  params?: object,
  config?: AxiosRequestConfig
) => {
  const queryClient = useQueryClient();

  return () => {
    if (!url) {
      return;
    }

    queryClient.prefetchQuery<T, Error, T, QueryKeyT>(
      [url!, params],
      ({queryKey}) => fetcher({queryKey, meta: {}, config})
    );
  };
};

export const useFetch = <T>(
  url: string | null,
  params?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT> & {
    axiosConfig?: AxiosRequestConfig;
  }
) => {
  const {axiosConfig, ...queryConfig} = config || {};
  const context = useQuery<T, Error, T, QueryKeyT>(
    [url!, params],
    ({queryKey}) => fetcher({queryKey, meta: {}, config: axiosConfig}),
    {
      enabled: !!url,
      ...queryConfig
    }
  );

  return context;
};

const useGenericMutation = <T, S>(
  func: (data: T | S, config?: AxiosRequestConfig) => Promise<AxiosResponse<S>>,
  url: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, T | S>((data) => func(data), {
    onMutate: async (data) => {
      await queryClient.cancelQueries([url!, params]);

      const previousData = queryClient.getQueryData([url!, params]);

      queryClient.setQueryData<T>([url!, params], (oldData) => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (err, _, context) => {
      console.log(err);
      queryClient.setQueryData([url!, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries([url!, params]);
    }
  });
};

export const useDelete = <T>(
  url: string,
  params?: object,
  updater?: (oldData: T, id: string | number) => T,
  config?: AxiosRequestConfig
) => {
  return useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}/${id}`, config),
    url,
    params,
    updater
  );
};

export const usePost = <T, S, D>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
  config?: AxiosRequestConfig<D>
) => {
  return useGenericMutation<T, S>(
    (data) => api.post<S>(url, data, config),
    url,
    params,
    updater
  );
};

export const useUpdate = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
  config?: AxiosRequestConfig
) => {
  return useGenericMutation<T, S>(
    (data) => api.patch<S>(url, data, config),
    url,
    params,
    updater
  );
};
