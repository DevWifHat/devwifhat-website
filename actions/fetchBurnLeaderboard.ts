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
            console.log("Fetched transactions: ", transactions);
            lastSignature = transactions[transactions.length - 1].signature;
            transactionsArr.push(...transactions);
        } else {
            console.log("No more transactions available.");
            break;
        }
    }

    // TODO: Filtering for Leaderboard
    return transactionsArr;
};


