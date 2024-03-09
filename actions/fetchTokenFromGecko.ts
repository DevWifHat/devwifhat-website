
"use server"

export const getTokenFromGecko = async () => {
    const response = await fetch(`https://api.geckoterminal.com/api/v2/networks/solana/tokens/DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o`);
    const { data } = await response.json();

    return data;
  };