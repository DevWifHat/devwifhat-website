'use client'

import { useState, useEffect } from 'react';
import { getBurnLeaderboard } from '@/actions/fetchBurnLeaderboard';

const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]); // TODO: Define a type for your leaderboard items
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const leaderboardData = await getBurnLeaderboard();
        setLeaderboard(leaderboardData);
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