"use server"

export const fetchTokenPrice = async () => {
    const response = await fetch('https://public-api.birdeye.so/public/price?address=DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o', {
        method: 'GET',
        headers: {
            'X-API-KEY': 'b51338369c304736a8cb9bdbcecda3f1'
        }
    });
    const data = await response.json();

    return data
}