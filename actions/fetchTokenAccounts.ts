"use server"

export const getTokenAccounts = async () => {
    let page = 1;
    let allOwners = new Set();
  
    while (true) {
      const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "getTokenAccounts",
          id: "helius-test",
          params: {
            page: page,
            limit: 1000,
            displayOptions: {},
            mint: "DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o",
          },
        }),
      });
      const data = await response.json();
  
      if (!data.result || data.result.token_accounts.length === 0) {
        console.log(`No more results. Total pages: ${page - 1}`);
        break;
      }
      console.log(`Processing results from page ${page}`);
      data.result.token_accounts.filter((acc: any) => acc.amount > 0).forEach((account: any) =>        
        allOwners.add(account.owner)
      );
      page++;
    }

    return Array.from(allOwners);
  };

