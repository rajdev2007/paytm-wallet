import { AvailableBalance } from "../components/AvailableBalance";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

function Transfer() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [refreshBalance, setRefreshBalance] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/bulk?filter=${recipient || ""}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setSuggestions(response.data.user || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setSuggestions([]);
      }
    };

    fetchUsers();
  }, [recipient]);

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      setMessage("⚠️ Please enter both recipient and amount");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: recipient,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        }
      );

      if (response.status === 200) {
        setMessage("✅ Transfer successful!");
        setRecipient("");
        setAmount("");
        setSuggestions([]);
        setShowSuggestions(false);
        setRefreshBalance((value) => !value);
      } else {
        setMessage("❌ Transfer failed");
      }
    } catch (error) {
      console.error("Transfer error:", error);
      setMessage("⚠️ Server error, please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center">
        <div className="mt-14">
          <AvailableBalance refreshTrigger={refreshBalance} />
        </div>

        <div className="flex flex-col mt-14 bg-white rounded-2xl gap-8 p-8 w-96 ml-11 shadow-xl relative">
          <div className="relative">
            <input
              className="p-4 border border-gray-400 placeholder-gray-400 rounded-xl w-full"
              placeholder="Recipient Username"
              value={recipient}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => setRecipient(e.target.value)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />

            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-48 overflow-y-auto shadow-md z-10">
                {suggestions.map((user) => (
                  <li
                    key={user._id}
                    className="p-3 hover:bg-blue-100 cursor-pointer transition"
                    onClick={() => {
                      setRecipient(user.username);
                      setShowSuggestions(false);
                    }}
                  >
                    <div className="font-medium text-gray-900">
                      {user.firstname} {user.lastname}
                    </div>
                    <div className="text-sm text-gray-500">@{user.username}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            className="p-4 border border-gray-400 placeholder-gray-400 rounded-xl w-full"
            placeholder="₹0.00"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={handleTransfer}
            className="rounded-xl border p-4 bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Send Money
          </button>

          {message && (
            <div className="text-center mt-2 text-gray-700 font-medium">
              {message}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Transfer;
