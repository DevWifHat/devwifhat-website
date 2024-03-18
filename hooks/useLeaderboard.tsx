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

  useEffect(() => {
    // Establish a connection to your SSE endpoint
    const eventSource = new EventSource('/api/events');

    // Handle incoming messages
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      
      // setLeaderboard(newLeaderboardData);
    };

    // Handle any errors
    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
      setError(true);
    };

    // Clean up the connection when the component unmounts or when reloading
    return () => {
      eventSource.close();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const reload = () => {
    setIndex((prev) => prev + 1);
  };

  return { leaderboard, isLoading, error, reload };
};

export default useLeaderboard;