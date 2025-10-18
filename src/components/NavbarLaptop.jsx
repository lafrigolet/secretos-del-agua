// src/components/NavbarLaptop.jsx
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StoreGrid from "./StoreGrid";
import Basket from "./Basket";
import { useBasket } from "../context/BasketContext";

export default function NavbarLaptop({
  logo,
  menuItems,
  activeDropdown,
  setActiveDropdown,
  isOverlayVisible,
  setIsOverlayVisible,
}) {
  const { basket } = useBasket();
  const basketCount = basket.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-[44px] border-b border-black bg-primary z-50 flex items-center justify-between px-12 hidden md:flex">
        {/* Logo */}
        <a href="https://www.secretosdelagua.com/">
          <img
            src={logo}
            alt="Secretos del Agua"
            className="h-7 w-auto object-contain"
          />
        </a>

        {/* Menu items */}
        <ul className="flex space-x-5">
          {menuItems.map((item) => (
            <li key={item.label} className="relative group">
              <a
                href={item.href || "#"}
                onMouseEnter={
                  item.dropdown
                    ? () => {
                      setActiveDropdown(item.dropdown);
                      setIsOverlayVisible(true);
                    }
                  : () => {
                    setActiveDropdown(null);
                    setIsOverlayVisible(false);
                  }
                }
                onMouseLeave={() => {
                  if (!item.dropdown) setIsOverlayVisible(false);
                }}
                className="text-[13px] text-white hover:text-gray-500 transition"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <button className="text-white hover:text-gray-500 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35M5.25 10.5a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z"
              />
            </svg>
          </button>

          {/* Bag */}
          <button
            onClick={() => {
              // toggle basket dropdown
              if (activeDropdown === "basket") {
                setActiveDropdown(null);
                setIsOverlayVisible(false);
              } else {
                setActiveDropdown("basket");
                setIsOverlayVisible(true);
              }
            }}
            className="text-white hover:text-gray-500 transition relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6h12l1 13H5L6 6zm3 0a3 3 0 116 0"
              />
            </svg>

            {/* Item count badge */}
            {basketCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                {basketCount}
              </span>
            )}
          </button>
          
          {/* Account */}
          <a
            href="https://www.secretosdelagua.com/mi-cuenta/"
            className="text-white hover:text-gray-500 transition"
          >
            <AccountCircleIcon fontSize="small" />
          </a>
        </div>
      </nav>

      {/* Desktop dropdown */}
      {activeDropdown && (activeDropdown === "basket" ? (
        <div
          onMouseLeave={() => {
            setActiveDropdown(null);
            setIsOverlayVisible(false);
          }}
          className={`fixed top-[44px] right-0 w-[400px] p-8 bg-primary border-b border-black shadow-lg z-40 overflow-hidden transition-all duration-500 ease-in-out ${
          activeDropdown
            ? "h-[75vh] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
        >
          <Basket />
        </div>
      ) : (
        /* Regular store dropdown with menu + StoreGrid + Basket */
        <div
          onMouseLeave={() => {
            setActiveDropdown(null);
            setIsOverlayVisible(false);
          }}
          className={`fixed top-[44px] left-0 w-full bg-primary border-b border-black shadow-lg z-40 overflow-hidden transition-all duration-500 ease-in-out ${
          activeDropdown
            ? "max-h-[75vh] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
        >
          
          <div className="py-8 px-10 h-[75vh]">
            <div className="max-w-7xl mx-auto h-full">
              <div className="flex flex-row gap-0.5 items-stretch h-full">
                {/* Menu list */}
                <div className="w-1/6 pr-4">
                  {activeDropdown.map((section) => (
                    <div key={section.title} className="mb-6">
                      <h3 className="uppercase text-[12px] font-semibold text-gray-400 mb-2">
                        {section.title}
                      </h3>
                      <ul className="space-y-1">
                        {section.links.map((link) => (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              className="group relative inline-block text-[14px] text-white"
                            >
                              {link.label}
                              <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                {/* StoreGrid */}
                <div className="flex-1 bg-primary">
                  <StoreGrid />
                </div>
                
                {/* Basket */}
                <div className="w-1/4 bg-primary max-h-[75vh]">
                  <Basket />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Overlay */}
      {isOverlayVisible && (
        <div
          className={`fixed inset-0 bg-primary/60 backdrop-blur-sm transition-opacity duration-500 z-30 ${
            activeDropdown ? "opacity-100" : "opacity-0"
          }`}
          onMouseEnter={() => {
            setActiveDropdown(null);
            setIsOverlayVisible(false);
          }}
        />
      )}
    </>
  );
}
