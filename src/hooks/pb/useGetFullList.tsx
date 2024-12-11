import { useState, useEffect } from 'react';
import { pb } from './main';

interface UseGetFullList {
  collection: string;
  sort?: string;
  filter?: string;
  expand?: string;
}

export const useGetFullList = <T = any>({
  collection,
  sort = '-created',
  filter = '',
  expand = ''
}: UseGetFullList) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {

    try {
      setLoading(true);
      const records = await pb.collection(collection).getFullList({
        sort: sort,
        filter: filter,
        expand: expand
      });
      setData(records as T[]);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchRecords();
  }, [collection, sort]);

  return { fetchRecords, data, error, loading };
};
