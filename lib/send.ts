import {
  Connection,
  SimulatedTransactionResponse,
  Transaction,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";

export const getUnixTs = () => {
  return new Date().getTime() / 1000;
};

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const DEFAULT_TIMEOUT = 30000;

export async function sendSignedTransaction({
  signedTransaction,
  connection,
  timeout = DEFAULT_TIMEOUT,
}: {
  signedTransaction: VersionedTransaction;
  connection: Connection;
  sendingMessage?: string;
  sentMessage?: string;
  successMessage?: string;
  timeout?: number;
}): Promise<{ txid: string; status: string }> {
  const rawTransaction = signedTransaction.serialize();
  const startTime = getUnixTs();
  const txid: TransactionSignature = await connection.sendRawTransaction(
    rawTransaction,
    {
      skipPreflight: true,
    },
  );
  console.log("Started awaiting confirmation for", txid);

  let done = false;
  (async () => {
    while (!done && getUnixTs() - startTime < timeout) {
      connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
      });
      await sleep(300);
    }
  })();

  let status = "unconfirmed";

  try {
    await awaitTransactionSignatureConfirmation(txid, timeout, connection);
    status = "confirmed";
  } catch (err) {
    if ((err as any).timeout) {
      console.log("Timed out awaiting confirmation on transaction");
    } else {
      console.log("Transaction failed");
    }
  } finally {
    done = true;
  }

  console.log("Latency", txid, getUnixTs() - startTime);
  return { txid, status };
}

async function awaitTransactionSignatureConfirmation(
  txid: TransactionSignature,
  timeout: number,
  connection: Connection,
) {
  let done = false;
  const result = await new Promise((resolve, reject) => {
    (async () => {
      setTimeout(() => {
        if (done) {
          return;
        }
        done = true;
        console.log("Timed out for txid", txid);
        reject({ timeout: true });
      }, timeout);
      try {
        connection.onSignature(
          txid,
          (result) => {
            console.log("WS confirmed", txid, result);
            done = true;
            if (result.err) {
              reject(result.err);
            } else {
              resolve(result);
            }
          },
          connection.commitment,
        );
        console.log("Set up WS connection", txid);
      } catch (e) {
        done = true;
        console.log("WS error in setup", txid, e);
      }
      while (!done) {
        // eslint-disable-next-line no-loop-func
        (async () => {
          try {
            const signatureStatuses = await connection.getSignatureStatuses([
              txid,
            ]);
            const result = signatureStatuses && signatureStatuses.value[0];
            if (!done) {
              if (!result) {
                // console.log('REST null result for', txid, result);
              } else if (result.err) {
                console.log("REST error for", txid, result);
                done = true;
                reject(result.err);
              } else if (
                !(
                  result.confirmations ||
                  result.confirmationStatus === "confirmed" ||
                  result.confirmationStatus === "finalized"
                )
              ) {
                console.log("REST not confirmed", txid, result);
              } else {
                console.log("REST confirmed", txid, result);
                done = true;
                resolve(result);
              }
            }
          } catch (e) {
            if (!done) {
              console.log("REST connection error: txid", txid, e);
            }
          }
        })();
        await sleep(300);
      }
    })();
  });
  done = true;
  return result;
}
