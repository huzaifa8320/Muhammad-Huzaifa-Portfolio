import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // Default will be set to empty

  // Sync activeLink with the URL hash when the component mounts or hash changes
  useEffect(() => {
    const currentHash = window.location.hash || "#home";
    setActiveLink(currentHash);
  }, []); 

  useEffect(() => {
    const handleHashChange = () => {
      setActiveLink(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  // Rearranged array with "about" at the top
  const links = ["#home", "#about", "#service", "#portfolio", "#contact"];

  return (
    <nav className="z-10 py-5 sticky top-0 bg-[#080808]">
      <div className="w-full flex gap-3 items-center">
        {/* Logo and Name */}
        <div className="text-white text-2xl font-bold flex items-center">
          <span>
            <span className="text-[#FF004F]">M</span>uhammad Huzaifa
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-10 ms-auto">
          {links.map((link) => (
            <a
              key={link}
              href={link}
              onClick={() => handleLinkClick(link)}
              className={`text-white  transition duration-300 transform hover:scale-105 ${activeLink === link ? "after:w-full after:bg-[#FF004F]" : "hover:text-gray-200"}  after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#FF004F] after:transition-all after:duration-300 hover:after:w-full`}
            >
              {link.slice(1, 2).toLocaleUpperCase() + link.slice(2)}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden ms-auto flex items-center">
          <button
            onClick={toggleDrawer}
            className="text-white focus:outline-none transition duration-300 transform hover:scale-110"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed overflow-y-auto top-0 right-0 h-full w-64 bg-gradient-to-b from-purple-600 to-blue-500 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}
      >
        <div className="p-6 items-center flex justify-end">
          <button
            onClick={toggleDrawer}
            className="text-white focus:outline-none transition duration-300 transform hover:scale-110"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-6 p-6">
          {links.map((link) => (
            <a
              key={link}
              href={link}
              onClick={() => {
                handleLinkClick(link);
                setIsOpen(false);
              }}

              className={`transition duration-300 transform hover:scale-105 ${activeLink === link ? "text-[#FF004F] font-semibold" : "hover:text-gray-200 text-white"
                }`} // Change color of active link
            >
              {link.slice(1, 2).toLocaleUpperCase() + link.slice(2)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
