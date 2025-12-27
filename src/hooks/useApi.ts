// Path: src/hooks/useApi.ts

import { useState, useCallback, useRef, useEffect } from "react";
import type { ApiError } from "../services/api";

export interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
  isSuccess: boolean;
  isError: boolean;
}

export interface UseApiActions<T> {
  execute: () => Promise<T | null>;
  reset: () => void;
  setData: (data: T | null) => void;
}

export interface UseApiOptions<T> {
  /** Execute immediately on mount */
  immediate?: boolean;
  /** Initial data value */
  initialData?: T | null;
  /** Callback on success */
  onSuccess?: (data: T) => void;
  /** Callback on error */
  onError?: (error: ApiError) => void;
  /** Cache duration in ms (0 = no cache) */
  cacheDuration?: number;
}

const cache = new Map<string, { data: unknown; timestamp: number }>();

/**
 * Generic hook for API calls with loading, error, and caching support
 */
export function useApi<T>(
  fetcher: () => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiState<T> & UseApiActions<T> {
  const {
    immediate = false,
    initialData = null,
    onSuccess,
    onError,
    cacheDuration = 0,
  } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: initialData,
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
  });

  const fetcherRef = useRef(fetcher);
  const optionsRef = useRef({ onSuccess, onError, cacheDuration });
  const mountedRef = useRef(true);
  const cacheKeyRef = useRef<string>("");

  // Update refs when dependencies change
  useEffect(() => {
    fetcherRef.current = fetcher;
    optionsRef.current = { onSuccess, onError, cacheDuration };
  }, [fetcher, onSuccess, onError, cacheDuration]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async (): Promise<T | null> => {
    const { onSuccess, onError, cacheDuration } = optionsRef.current;

    // Check cache
    if (cacheDuration > 0 && cacheKeyRef.current) {
      const cached = cache.get(cacheKeyRef.current);
      if (cached && Date.now() - cached.timestamp < cacheDuration) {
        const data = cached.data as T;
        if (mountedRef.current) {
          setState({
            data,
            isLoading: false,
            error: null,
            isSuccess: true,
            isError: false,
          });
        }
        return data;
      }
    }

    if (mountedRef.current) {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        isError: false,
      }));
    }

    try {
      const data = await fetcherRef.current();

      // Cache result
      if (cacheDuration > 0 && cacheKeyRef.current) {
        cache.set(cacheKeyRef.current, { data, timestamp: Date.now() });
      }

      if (mountedRef.current) {
        setState({
          data,
          isLoading: false,
          error: null,
          isSuccess: true,
          isError: false,
        });
        onSuccess?.(data);
      }

      return data;
    } catch (err) {
      const error = err as ApiError;
      if (mountedRef.current) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error,
          isSuccess: false,
          isError: true,
        }));
        onError?.(error);
      }
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    if (mountedRef.current) {
      setState({
        data: initialData,
        isLoading: false,
        error: null,
        isSuccess: false,
        isError: false,
      });
    }
  }, [initialData]);

  const setData = useCallback((data: T | null) => {
    if (mountedRef.current) {
      setState((prev) => ({
        ...prev,
        data,
      }));
    }
  }, []);

  // Execute immediately if requested
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    reset,
    setData,
  };
}

/**
 * Hook for paginated API calls
 */
export interface UsePaginatedApiState<T> extends UseApiState<T[]> {
  page: number;
  hasMore: boolean;
  total: number;
}

export interface UsePaginatedApiOptions<T> extends UseApiOptions<T[]> {
  pageSize?: number;
}

export function usePaginatedApi<T>(
  fetcher: (page: number, pageSize: number) => Promise<{ data: T[]; total: number }>,
  options: UsePaginatedApiOptions<T> = {}
) {
  const { pageSize = 20, ...restOptions } = options;

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [allData, setAllData] = useState<T[]>([]);

  const paginatedFetcher = useCallback(async () => {
    const result = await fetcher(page, pageSize);
    setTotal(result.total);
    setHasMore(allData.length + result.data.length < result.total);
    return result.data;
  }, [fetcher, page, pageSize, allData.length]);

  const api = useApi(paginatedFetcher, {
    ...restOptions,
    initialData: [],
    onSuccess: (data) => {
      if (page === 1) {
        setAllData(data);
      } else {
        setAllData((prev) => [...prev, ...data]);
      }
      restOptions.onSuccess?.(data);
    },
  });

  const loadMore = useCallback(() => {
    if (hasMore && !api.isLoading) {
      setPage((p) => p + 1);
    }
  }, [hasMore, api.isLoading]);

  const refresh = useCallback(() => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
  }, []);

  return {
    ...api,
    data: allData,
    page,
    hasMore,
    total,
    loadMore,
    refresh,
  };
}

/**
 * Hook for mutation operations (POST, PUT, DELETE)
 */
export function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: ApiError, variables: TVariables) => void;
    onSettled?: (data: TData | null, error: ApiError | null, variables: TVariables) => void;
  } = {}
) {
  const [state, setState] = useState<{
    data: TData | null;
    isLoading: boolean;
    error: ApiError | null;
    isSuccess: boolean;
    isError: boolean;
  }>({
    data: null,
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
  });

  const mutate = useCallback(
    async (variables: TVariables): Promise<TData | null> => {
      setState({
        data: null,
        isLoading: true,
        error: null,
        isSuccess: false,
        isError: false,
      });

      try {
        const data = await mutationFn(variables);
        setState({
          data,
          isLoading: false,
          error: null,
          isSuccess: true,
          isError: false,
        });
        options.onSuccess?.(data, variables);
        options.onSettled?.(data, null, variables);
        return data;
      } catch (err) {
        const error = err as ApiError;
        setState({
          data: null,
          isLoading: false,
          error,
          isSuccess: false,
          isError: true,
        });
        options.onError?.(error, variables);
        options.onSettled?.(null, error, variables);
        return null;
      }
    },
    [mutationFn, options]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
      isSuccess: false,
      isError: false,
    });
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
}

/**
 * Clear API cache
 */
export function clearApiCache(key?: string): void {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}

export default useApi;
