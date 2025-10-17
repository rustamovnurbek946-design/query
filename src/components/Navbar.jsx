import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserIcon,
  CubeIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: <HomeIcon className="h-5 w-5" />, path: "/" },
    { name: "Account", icon: <UserIcon className="h-5 w-5" />, path: "/account" },
    { name: "Blocks", icon: <CubeIcon className="h-5 w-5" />, path: "/blocks" },
    { name: "Create", icon: <PlusCircleIcon className="h-5 w-5" />, path: "/create" },
  ];

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 p-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all"
      >
          <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Sidebar panel */}
      <aside
        className={`z-20 fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-700 to-blue-600 text-white shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <h1 className="text-xl font-bold tracking-wide">Fruit Market 🍓</h1>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-md hover:bg-white/10 transition-all"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-2 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-5 left-0 w-full px-4">
          <p className="text-sm text-white/70 text-center">
            © 2025 Fruit Market. All rights reserved.
          </p>
        </div>
      </aside>

      {/* Overlay
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )} */}
    </>   
  );
}
