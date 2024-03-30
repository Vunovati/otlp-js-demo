import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Layout({ children, cart, setOpen }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div>Observable Apparel Shop</div>
          <button onClick={() => setOpen(true)} className="flex items-center">
            <ShoppingCartIcon className="h-6 w-6 mr-2" />
            Cart({cart?.items?.length ?? 0})
          </button>
        </nav>
      </header>
      <main className="mt-16 w-full">{children}</main>
    </div>
  );
}
