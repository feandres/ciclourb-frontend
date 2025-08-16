"use client";

import { useState } from "react";
import { Menu as LucideMenu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/data", label: "Dados" },
    { label: "Mapas", subItems: [
        { href: "/map/malha-atual", label: "Malha Atual" },
        { href: "/map/pdci", label: "PDCI" },
      ]
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">

        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Ciclourb Logo"
              className="h-10 w-auto md:h-12 lg:h-14 transition-opacity hover:opacity-80"
            />
          </a>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            if (item.subItems) {
              return (
                <div key={item.label} className="relative group">
                  <span className="relative px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer rounded-md hover:bg-gray-100">
                    {item.label}
                  </span>
                  <div className="absolute top-full left-0 mt-1 hidden group-hover:block w-40 bg-white border rounded-md shadow-lg z-50">
                    {item.subItems.map(sub => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 hover:bg-gray-100 rounded-md group"
              >
                {item.label}
                <span className="absolute inset-x-1 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
              </a>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                <LucideMenu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader className="text-left">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navegue pelas seções do site
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => {
                  if (item.subItems) {
                    return (
                      <div key={item.label} className="flex flex-col gap-2">
                        <span className="px-4 py-2 font-medium">{item.label}</span>
                        {item.subItems.map(sub => (
                          <a
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
