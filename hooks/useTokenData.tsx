import { getTokenAccounts } from '@/actions/fetchTokenAccounts';
import { getTokenFromGecko } from '@/actions/fetchTokenFromGecko';
import { useState, useEffect } from 'react';

const useTokenData = () => {
  const [holders, setHolders] = useState(0);
  const [price, setPrice] = useState(0);
  const [currentSupply, setCurrentSupply] = useState(0);
  const [volume, setVolume] = useState(0);
  const [fdmc, setFdmc] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchTokenHoldersPromise = getTokenAccounts();
        const fetchTokenDataGeckoPromise = getTokenFromGecko();

        const [owners, token] = await Promise.all([fetchTokenHoldersPromise, fetchTokenDataGeckoPromise]);

        // Set state for token holders
        setHolders(owners.length);

        // Set state for token data from Gecko
        setVolume(parseInt(token.attributes.volume_usd.h24));
        setFdmc(parseInt(token.attributes.fdv_usd));
        setPrice(parseFloat(token.attributes.price_usd));
        setCurrentSupply(parseInt(token.attributes.total_supply));
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { holders, price, currentSupply, volume, fdmc, isLoading, error };
};

export default useTokenData;