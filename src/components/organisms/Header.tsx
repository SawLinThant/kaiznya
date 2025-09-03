import React from "react";
import Link from "next/link";
import { Button, Icon, Input } from "@/components";
import { cn } from "@/lib/utils";

interface HeaderProps {
  dict?: any;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ dict, className }) => {
  return (
    <header className={cn("bg-white border-gray-200 hidden md:block", className)}>
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-0 md:px-0">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo/Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-gray-900">
              ECOMMERCE
            </Link>
            <div className="relative w-full">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Icon name="search" className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search here"
                className="pl-4 pr-4 py-2 w-full border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            {/* Category Dropdown */}
            <div className="hidden lg:flex items-center">
              <select className="text-sm font-medium text-gray-700 bg-transparent border-none cursor-pointer focus:outline-none">
                <option>All Category</option>
                <option>Outdoor Active</option>
                <option>Casual Comfort</option>
                <option>Fashion</option>
              </select>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <Link
                href="/gift-cards"
                className="text-sm min-w-[70px] font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Gift Cards
              </Link>
              <Link
                href="/special-event"
                className="text-sm font-medium min-w-[100px] text-gray-700 hover:text-gray-900 transition-colors"
              >
                Special Event
              </Link>
            </nav>
          </div>

          {/* Search Bar - Desktop */}
          {/* <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
         
          </div> */}

          {/* Right Side Navigation */}
          <div className="flex items-center">
            {/* Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              <button className="p-1.5 sm:p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Icon name="heart" className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button className="p-1.5 sm:p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Icon name="star" className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button className="p-1.5 sm:p-2 text-gray-700 hover:text-gray-900 transition-colors relative">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            {/* <button className="md:hidden p-1.5 sm:p-2 text-gray-700 hover:text-gray-900">
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button> */}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="search" className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search here"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
