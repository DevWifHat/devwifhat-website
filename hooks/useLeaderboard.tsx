'use client'

import { getBurnLeaderboard } from '@/actions/fetchBurnLeaderboard';
import { useState, useEffect } from 'react';

const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]); // TODO type
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const leaderboard = await getBurnLeaderboard();
        setLeaderboard(leaderboard);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { leaderboard, isLoading, error };
};

export default useLeaderboard;