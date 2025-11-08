import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

export const Navbar = ()=>{

  const navigate = useNavigate();

    const navItems = [
      {name: "Home", path: "/"}, 
      {name: "Transfer", path: "/transfer"},
      {name: "Contact", path: "/contact"},
      {name: "About", path: "/about"}
    ];

    const handleProfileClick = async() => {
    const token = localStorage.getItem("token");
    if (!token){
      navigate("/signup");
      return;
    }
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (response.status === 200) {
        navigate("/account");
      } else {
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      navigate("/signup");
    }
  };

    return <div className="flex justify-between bg-white items-center">

        <div className="w-48">
          <Link to={"/"}><img src="/logo.png" alt="logo" /></Link>
        </div>

        <div className="flex justify-center gap-6 font-semibold text-2xl">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative transition-colors duration-200 hover:text-blue-500 ${
                  isActive ? "text-blue-500" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-blue-500 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="pr-4 cursor-pointer" onClick={handleProfileClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-11 h-11">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>

    </div>
}