"use server"

export const getAsset = async () => {
    const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getAsset',
        params: {
          id: 'DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o',
          displayOptions: {
          showFungible: true //return details about a fungible token
      }
        },
      }),
    });
    const { result } = await response.json();

    return result;
  };