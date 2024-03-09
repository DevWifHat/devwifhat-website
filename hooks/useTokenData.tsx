import { getAsset } from '@/actions/fetchToken';
import { getTokenAccounts } from '@/actions/fetchTokenAccounts';
import { fetchTokenPrice } from '@/actions/fetchTokenPrice';
import { useState, useEffect } from 'react';

const useTokenData = () => {
  const [holders, setHolders] = useState(0);
  const [price, setPrice] = useState(0);
  const [currentSupply, setCurrentSupply] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTokenHolders = async () => {
      setIsLoading(true);
      try {
        // holders
        const owners = await getTokenAccounts()
        setHolders(owners.length);
        
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTokenData = async () => {
      try {
        const asset = await getAsset();
        setCurrentSupply(asset.token_info.supply)
      } catch (error) {
        
      }
    }

    const fetchPrice = async () => {
      try {
        const token = await fetchTokenPrice();
        setPrice(token.data.value);
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    }
    fetchTokenHolders();
    fetchPrice();
    fetchTokenData();
  }, []);

  return { holders, price, currentSupply, isLoading, error };
};

export default useTokenData;
