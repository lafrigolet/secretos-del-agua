// src/components/Navbar.jsx
import React, { useState } from "react";
import NavbarLaptop from "./NavbarLaptop";
import NavbarMobile from "./NavbarMobile";

export default function Navbar({ logo, menuItems }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileItem, setActiveMobileItem] = useState(null);

  return (
    <div>
      <NavbarLaptop
        logo={logo}
        menuItems={menuItems}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        isOverlayVisible={isOverlayVisible}
        setIsOverlayVisible={setIsOverlayVisible}
      />

      <NavbarMobile
        logo={logo}
        menuItems={menuItems}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        activeMobileItem={activeMobileItem}
        setActiveMobileItem={setActiveMobileItem}
      />

      {/* Spacer for fixed navbar */}
      <div className="h-[44px]" />
    </div>
  );
}
