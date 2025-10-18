// src/components/NavbarMobile.jsx
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import StoreGrid from "./StoreGrid";
import Basket from "./Basket";
import { useBasket } from "../context/BasketContext";

export default function NavbarMobile({
  logo,
  menuItems,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  activeMobileItem,
  setActiveMobileItem,
}) {
  const { basket } = useBasket();
  const basketCount = basket.reduce((sum, item) => sum + item.quantity, 0);
  
  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    if (newState && menuItems.length > 0)
      setActiveMobileItem(menuItems[0].label);
  };

  const handleMobileItemClick = (item) => setActiveMobileItem(item.label);

  return (
    <>
      {/* 🔝 Top Bar */}
      <nav className="fixed top-0 left-0 w-full h-[44px] bg-primary border-b border-black z-50 flex items-center justify-between px-4 md:hidden">
        {/* ☰ Hamburger */}
        <button
          className="text-white hover:text-gray-400 transition"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <CloseIcon fontSize="small" />
          ) : (
            <MenuIcon fontSize="small" />
          )}
        </button>

        {/* 🏷 Logo */}
        <a
          href="https://www.secretosdelagua.com/"
          className="absolute left-1/2 -translate-x-1/2"
        >
          <img src={logo} alt="Secretos del Agua" className="h-6 w-auto" />
        </a>

        {/* 👤 Right icons */}
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

      {/* 📱 Dropdown menu */}
      <div
        className={`fixed top-[44px] left-0 w-full bg-primary border-b border-gray-800 z-50 overflow-y-auto transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 h-[100vh]"
            : "opacity-0 -translate-y-3 max-h-0 pointer-events-none"
        }`}
      >
        <div className="grid grid-cols-2 divide-x divide-gray-700">
          {/* Left column: main menu */}
          <ul className="flex flex-col py-4">
            {menuItems.map((item) => (
              <li key={item.label} className="px-4 py-2">
                <button
                  onClick={() => handleMobileItemClick(item)}
                  className="relative group text-[14px] text-gray-300 hover:text-white transition"
                >
                  <span
                    className={`relative inline-block pb-[2px] ${
                      activeMobileItem === item.label
                        ? "text-white"
                        : "group-hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 bottom-0 h-[1.5px] bg-white transition-all duration-300 ease-out ${
                        activeMobileItem === item.label
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Right column: submenu */}
          <div className="py-4 px-4">
            {activeMobileItem ? (
              menuItems
                .find((item) => item.label === activeMobileItem)
              ?.dropdown?.map((section) => (
                <div key={section.title} className="mb-4">
                  <h3 className="uppercase text-[12px] font-semibold text-gray-400 mb-1">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="block text-[14px] text-gray-200 hover:text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                Selecciona una categoría →
              </p>
            )}
          </div>
        </div>

        {/* 🧩 StoreGrid just below the menu options (scrollable) */}
        <div className="bg-[#fafafa] border-t border-gray-300">
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="[&>div>div.grid]:grid-cols-2">
              <StoreGrid />
            </div>
          </div>
        </div>
      </div>

      {/* 🔲 Overlay */}
      <div
        className={`fixed inset-0 bg-primary/60 transition-all duration-500 ease-in-out z-40 md:hidden ${
          isMobileMenuOpen
            ? "backdrop-blur-sm opacity-100 visible"
            : "backdrop-blur-0 opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
