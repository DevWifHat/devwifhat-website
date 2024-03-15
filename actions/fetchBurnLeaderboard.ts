"use server"

export const getBurnLeaderboard = async () => {
    let url = `https://api.helius.xyz/v0/addresses/DeVwhQE3FsUcqXq3AKjdwwjLVZZqaz9URwLghMUCtN4u/transactions?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}&type=BURN`;
    let lastSignature = null;

    const transactionsArr = []

    while (true) {
        if (lastSignature) {
            url += `&before=${lastSignature}`;
        }
        const response = await fetch(url);
        const transactions = await response.json();

        if (transactions && transactions.length > 0) {
            lastSignature = transactions[transactions.length - 1].signature;
            transactionsArr.push(...transactions);
        } else {
            console.log("No more transactions available.");
            break;
        }
    }

    const aggregatedLeaderboard = transactionsArr.reduce((acc, tx) => {
        if (acc[tx.feePayer]) {
            acc[tx.feePayer] += tx.tokenTransfers.reduce((acc: any, curr: any) => acc + curr.tokenAmount, 0);
        } else {
            acc[tx.feePayer] = tx.tokenTransfers.reduce((acc: any, curr: any) => acc + curr.tokenAmount, 0);
        }
        return acc;
    }, {});
    
    const leaderboard = Object.entries(aggregatedLeaderboard).map(([wallet, amount]) => ({
        wallet,
        amount
    }));

    // TODO: Filtering for Leaderboard
    return leaderboard;
};


