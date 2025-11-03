import { useState } from "react";

export const Navbar = ()=>{
    
    const [active, setActive] = useState("Home");
    const navItems = ["Home", "Transfer", "Contact", "About"];

    return <div className="flex justify-between bg-white items-center">

        <div className="w-48">
            <img src="/logo.png" alt="logo" />
        </div>

        <div className="flex justify-center gap-6 font-semibold text-2xl">
            {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`
              relative transition-colors duration-200 
              hover:text-[#00baf2] 
              ${active === item ? "text-[#00baf2]" : ""}
            `}
          >
            {item}
            {active === item && (
              <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#00baf2] rounded-full"></span>
            )}
          </button>
        ))}
        </div>

        <div className="pr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-11 h-11">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        </div>

    </div>
}