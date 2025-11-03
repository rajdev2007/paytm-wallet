import axios from "axios";
import { Navbar } from "../components/Navbar"
import { useEffect, useState } from "react";

function Home (){
    const [balance, setBalance] = useState(0.00);
    const token = localStorage.getItem("token");
    async function fetchBalance(){
        if (!token){
            setBalance(0.00);
            return;
        }
        try{
            const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers: {
                    Authorization: token
                }
            })
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

    useEffect(()=>{
        fetchBalance();
    }, []);

    return <div>

        <Navbar></Navbar>

        <div className="grid grid-cols-12 bg-white items-center shadow-xl ml-60 mr-60 mt-12 rounded-2xl h-60">

            <div className="col-span-4 bg-blue-200 rounded-2xl items-center h-40 ml-10 pt-9 pl-28 w-96">
                <div className="font-semibold text-xl pb-1 text-blue-950">
                    Available Balance
                </div>
                <div className="font-bold text-6xl text-blue-500 pl-2">
                    ₹{balance.toFixed(2)}
                </div>
            </div>

            <div className="col-span-8 flex justify-end gap-14 mr-10 items-center">
                <div>
                    <div className="bg-blue-100 rounded-full w-20 h-20 items-center pt-3 pl-3 ml-1 mb-3">
                        <img src="/send.png" className="w-14 h-14"/>
                    </div>
                    <div className="font-medium">
                        Send Money
                    </div>
                </div>
                <div>
                    <div className="bg-blue-100 rounded-full w-20 h-20 items-center pt-3 pl-3 mb-3">
                        <img src="/request.png" className="w-14 h-14"/>
                    </div>
                    <div className="ml-2.5 font-medium">
                        Request
                    </div>
                </div>
                <div>
                    <div className="bg-blue-100 rounded-full w-20 h-20 items-center pt-3 pl-3 mb-3">
                        <img src="/invest.png" className="w-14 h-14"/>
                    </div>
                    <div className="ml-5 font-medium">
                        Invest
                    </div>
                </div>
            </div>

        </div>

    </div>
}

export default Home;