import { AvailableBalance } from "../components/AvailableBalance";
import { Navbar } from "../components/Navbar"
import Footer from "../components/Footer"

function Transfer (){
    return <div className="flex flex-col min-h-screen">
        <Navbar></Navbar>

    <div className="flex flex-col items-center">
        <div className="mt-14">
            <AvailableBalance></AvailableBalance>
        </div>

        <div className="flex flex-col mt-14 bg-white rounded-2xl gap-8 p-8 w-96 ml-11 shadow-xl">
            <input className="p-4 border rounded-xl " placeholder="Recipient Username"></input>
            <input className="p-4 border rounded-xl " placeholder="₹0.00"></input>
            <button className="rounded-xl border p-4 bg-blue-500">Send Money</button>
        </div>
    </div>

        <Footer></Footer>
    </div>
}

export default Transfer;