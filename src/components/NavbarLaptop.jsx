// src/components/NavbarLaptop.jsx
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavbarLaptop({
  logo,
  menuItems,
  activeDropdown,
  setActiveDropdown,
  isOverlayVisible,
  setIsOverlayVisible,
}) {
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
          <a
            href="https://www.apple.com/shop/bag"
            className="text-white hover:text-gray-500 transition"
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
          </a>

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
      <div
        onMouseLeave={() => {
          setActiveDropdown(null);
          setIsOverlayVisible(false);
        }}
        className={`fixed top-[44px] left-0 w-full bg-primary border-b border-black shadow-lg z-40 overflow-hidden transition-all duration-500 ease-in-out ${
          activeDropdown
            ? "max-h-[400px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        {activeDropdown && (
          <div className="py-8 px-20">
            <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
              {activeDropdown.map((section, idx) => (
                <div key={section.title}>
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
          </div>
        )}
      </div>

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
