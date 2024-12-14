import { useState, useEffect } from 'react';
import { pb } from './main';

interface UseGetOne {
  collection: string;
  recordId: string,
  expand?: string
}

export const useGetOne = <T = any>({
  collection,
  recordId,
  expand = ""
}: UseGetOne) => {
  const [data, setData] = useState<T | null>();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRecord = async () => {

    try {
      setLoading(true);
      const records = await pb.collection(collection).getOne(recordId, {
        expand: expand
      });
      setData(records as T);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchRecord();
  }, [collection]);

  return { fetchRecord, data, error, loading };
};
