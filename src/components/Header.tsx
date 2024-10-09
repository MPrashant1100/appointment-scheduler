import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold text-indigo-600">
                  Gynoveda Clinic
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Book Appointment
            </Link>
            <Link
              href="/appointments"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              View Appointments
            </Link>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              {/* Simple hamburger icon using divs later on using image or icon here */}
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-gray-700"></div>
                <div className="w-6 h-0.5 bg-gray-700"></div>
                <div className="w-6 h-0.5 bg-gray-700"></div>
              </div>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="lg:hidden mt-2 bg-white shadow-md rounded-lg p-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Book Appointment
            </Link>
            <Link
              href="/appointments"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              View Appointments
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
