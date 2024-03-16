export async function getPriorityFeeEstimate(priorityLevel: string) {
    const response = await fetch(process.env.NEXT_PUBLIC_HELIUS_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "1",
        method: "getPriorityFeeEstimate",
        params: [
          {
            accountKeys: ["DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o"],
            options: { priorityLevel: priorityLevel },
          },
        ],
      }),
    });
    const data = await response.json();
    console.log(
      "Fee in function for",
      priorityLevel,
      " :",
      data.result.priorityFeeEstimate
    );
    return data.result;
  }