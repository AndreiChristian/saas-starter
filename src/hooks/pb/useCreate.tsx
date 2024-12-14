import { useState } from 'react';
import { pb } from './main';

// Generic type for the record data
type CreateRecordHook<T> = {
  create: (data: T) => Promise<T>;
  isLoading: boolean;
  error: Error | null;
};

export function useCreate<T>(
  collectionName: string
): CreateRecordHook<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (data: T) => {
    setIsLoading(true);
    setError(null);

    try {
      const record = await pb.collection(collectionName).create(data) as T
      return record;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}
