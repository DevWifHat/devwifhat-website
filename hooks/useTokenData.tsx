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

    const fetchTokenDataGecko = async () => {
      try {
        const token = await getTokenFromGecko();
        
        setVolume(parseInt(token.attributes.volume_usd.h24));
        setFdmc(parseInt(token.attributes.fdv_usd));
        setPrice(parseFloat(token.attributes.price_usd));
        setCurrentSupply(parseInt(token.attributes.total_supply))
      } catch (error) {
        console.log(error);
      }
    }

    fetchTokenHolders();
    fetchTokenDataGecko();
  }, []);

  return { holders, price, currentSupply, volume, fdmc, isLoading, error };
};

export default useTokenData;
