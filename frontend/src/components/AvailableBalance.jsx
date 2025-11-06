import axios from "axios";
import { useEffect, useState } from "react";

export const AvailableBalance = ({ refreshTrigger }) => {
  const [balance, setBalance] = useState(0.00);
  const token = localStorage.getItem("token");

  async function fetchBalance() {
    if (!token) {
      setBalance(0.00);
      return;
    }
    try {
      const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.status === 200 && response.data.balance !== undefined) {
        setBalance(response.data.balance);
      } else {
        setBalance(0.0);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(0.00);
    }
  }

  useEffect(() => {
    fetchBalance();
  }, [refreshTrigger]);

  return (
    <div className="col-span-4 bg-blue-200 rounded-2xl flex flex-col justify-center items-center h-40 ml-10 w-96">
      <div className="font-semibold text-xl text-blue-950 mb-2">
        Available Balance
      </div>
      <div className="font-bold text-6xl text-blue-500 pl-1">
        ₹{balance.toFixed(2)}
      </div>
    </div>
  );
};
