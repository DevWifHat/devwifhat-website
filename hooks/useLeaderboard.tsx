'use client'

import { getBurnLeaderboard } from '@/actions/fetchBurnLeaderboard';
import { useState, useEffect } from 'react';

const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]); // TODO type
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [index, setIndex] = useState(0);

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
  }, [index]);

  const reload = () => {
    setIndex((prev) => prev + 1);
  };

  return { leaderboard, isLoading, error, reload };
};

export default useLeaderboard;