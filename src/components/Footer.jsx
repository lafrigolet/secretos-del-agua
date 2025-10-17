import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaPinterestP,
  FaTiktok,
} from "react-icons/fa";
import { SiVimeo } from "react-icons/si";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/secretosdelagua/",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/secretosdelagua",
    icon: FaFacebookF,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@secretosdelagua",
    icon: FaYoutube,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/secretosdelagua",
    icon: FaLinkedinIn,
  },
  {
    name: "Vimeo",
    href: "https://vimeo.com/secretosdelagua",
    icon: SiVimeo,
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/secretosdelagua",
    icon: FaPinterestP,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@secretosdelagua",
    icon: FaTiktok,
  },
];

const paymentMethods = [
  {
    name: "Bizum",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 16M20 4L4 20" />
      </svg>
    ),
  },
  {
    name: "Transferencia Internacional",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16M4 14h16M12 4v16" />
      </svg>
    ),
  },
  {
    name: "Visa",
    icon: SiVisa,
  },
  {
    name: "Mastercard",
    icon: SiMastercard,
  },
  {
    name: "Paypal",
    icon: SiPaypal,
  },
];

export default function Footer({ storeSections }) {
  return (
    <footer className="bg-secondary border-t border-gray-200 text-gray-600 text-sm">
      {/* Top footer links */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-8">
        {storeSections.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold text-gray-800 text-xs uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.links.map((link) => (
                <li key={link.label} className="relative group">
                  <a
                    href={link.href}
                    className="relative inline-block text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.label}
                    {/* underline animation */}
                    <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-gray-800 transition-all duration-300 ease-out group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="w-full border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Social icons (left) */}
          <div className="flex space-x-4 items-center justify-center md:justify-start w-full md:w-auto">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                className="text-gray-500 hover:text-gray-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* Copyright (center) */}
          <p className="text-center w-full md:w-auto text-xs text-gray-500">
            © {new Date().getFullYear()} Secretos del Agua. Todos los derechos reservados.
          </p>

          {/* Payment methods (right) */}
          
          <div className="flex space-x-4 items-center justify-center md:justify-end w-full md:w-auto">
            <SiVisa size={20} />
            <SiMastercard size={20} />
            <SiPaypal size={20} />
          </div>
        </div>
      </div>
    </footer>
  );
}
