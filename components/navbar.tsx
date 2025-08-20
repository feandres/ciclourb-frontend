"use client";

import { useState } from "react";
import { Menu as LucideMenu, ChevronDown } from "lucide-react";
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
    {
      label: "Mapas",
      subItems: [
        { href: "/map/malha-atual", label: "Malha Atual" },
        { href: "/map/pdci", label: "PDCI" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#FFF8E5] via-[#FFFBF0] to-[#FFF8E5] border-b-2 border-[#d6c9a3] shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-[#FFF8E5]/95">
      <nav className="max-w-7xl mx-auto flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <a href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Ciclourb Logo"
              className="h-10 w-auto md:h-12 lg:h-14 transition-all duration-300 hover:opacity-90 hover:scale-105"
            />
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {navItems.map((item) => {
            if (item.subItems) {
              return (
                <div key={item.label} className="relative group">
                  <div className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-[#4D3A08] cursor-pointer rounded-xl hover:bg-white/60 hover:shadow-md hover:text-[#79693F] transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-[#d6c9a3]/30">
                    <span>{item.label}</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </div>

                  {/* Dropdown */}
                  <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-48 bg-white/95 backdrop-blur-md border-2 border-[#d6c9a3]/40 rounded-2xl shadow-2xl overflow-hidden">
                      {item.subItems.map((sub, index) => (
                        <a
                          key={sub.href}
                          href={sub.href}
                          className={`block px-6 py-3 text-sm font-medium text-[#4D3A08] hover:bg-gradient-to-r hover:from-[#79693F]/10 hover:to-[#4D3A08]/10 hover:text-[#79693F] transition-all duration-200 ${
                            index !== item.subItems.length - 1
                              ? "border-b border-[#d6c9a3]/20"
                              : ""
                          }`}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-semibold text-[#4D3A08] hover:bg-white/60 hover:shadow-md hover:text-[#79693F] rounded-xl transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-[#d6c9a3]/30"
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 hover:bg-white/60 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105"
              >
                <LucideMenu className="h-6 w-6 text-[#79693F]" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] bg-gradient-to-b from-[#FFF8E5] to-[#FFFBF0] border-l-2 border-[#d6c9a3]/40"
            >
              <SheetHeader className="text-left border-b border-[#d6c9a3]/30 pb-4">
                <SheetTitle className="text-[#4D3A08] text-xl font-bold">
                  Menu
                </SheetTitle>
                <SheetDescription className="text-[#79693F] text-sm">
                  Navegue pelas seções do site
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => {
                  if (item.subItems) {
                    return (
                      <div key={item.label} className="flex flex-col gap-2">
                        <span className="px-4 py-2 font-medium text-[#4D3A08]">
                          {item.label}
                        </span>
                        {item.subItems.map((sub) => (
                          <a
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-2 text-[#4D3A08] hover:font-bold rounded-md"
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
                      className="flex items-center px-4 py-3 text-base font-medium text-[#4D3A08] hover:font-bold rounded-lg"
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#d6c9a3]/30">
                  <p className="text-xs text-[#79693F] text-center font-medium">
                    Ciclourb - Mobilidade Sustentável
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
