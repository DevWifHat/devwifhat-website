'use client';

import { WalletContextState } from "@solana/wallet-adapter-react";
import { useEffect } from "react";

export interface CurrencyFieldProps {
    field: "input" | "output";
    backgroundColor?: string;
    tokenName: string;
    value: number | string;
    getSwapPrice: (value: string) => void;
    signer: WalletContextState;
    balance: number;
}

const CurrencyField = (props: CurrencyFieldProps) => {
    const backgroundColor = props.backgroundColor ?? "bg-emerald-600";
  
    const getPrice = (value: string) => {
      props.getSwapPrice(value);
    };

    useEffect(() => {
      console.log("value", props.value);
    }, [props.value]);
  
    return (
      <div className="flex justify-between">
        <div className="flex flex-col w-3/5">
          <input
            className={`${backgroundColor} text-4xl`}
            placeholder="0.0"
            value={props.value}
            onBlur={(e) =>
              props.field === "input" ? getPrice(e.target.value) : null
            }
          />
          <span>$0.00</span>
        </div>
        <div className="flex flex-col w-2/5">
          <button className="bg-slate-600 px-2 py-1 text-slate-200 text-lg font-bold rounded-full border border-slate-700">
            {props.tokenName}
          </button>
          <div className="text-sm mt-2 text-center">
            Balance: {props.balance?.toFixed(3)}
          </div>
        </div>
      </div>
    );
  };
  
  export default CurrencyField;