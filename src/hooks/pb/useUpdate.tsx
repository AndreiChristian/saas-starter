import { useState } from 'react';
import { pb } from './main';

// Generic type for the record data
type UpdateRecordHook<T> = {
  update: (recordId: string, data: T) => Promise<T>;
  isLoading: boolean;
  error: Error | null;
};

export function useUpdate<T>(
  collectionName: string
): UpdateRecordHook<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = async (recordId: string, data: T) => {
    setIsLoading(true);
    setError(null);

    try {
      const record = await pb.collection(collectionName).update(recordId, data) as T
      return record;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { update, isLoading, error };
}
