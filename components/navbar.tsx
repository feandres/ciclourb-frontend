"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
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
import Link from "next/link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/data", label: "Dados" },
    {
      label: "Mapas",
      subItems: [
        { href: "/map/pdci", label: "Malha PDCI" },
        { href: "/map/malha-atual", label: "Malha Atual" },
      ],
    },
    { href: "/desafio-intermodal", label: "Desafio Intermodal" },
  ];

  const isDesafioIntermodal = pathname === "/desafio-intermodal";

  return (
    <>
      <header className="hidden md:block sticky top-0 z-50 w-full bg-gradient-to-r from-[#FFF8E5] via-[#FFFBF0] to-[#FFF8E5] border-b-2 border-[#d6c9a3] shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-[#FFF8E5]/95">
        <nav className="max-w-7xl mx-auto flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <img
                src={isDesafioIntermodal ? "/logo_alt_azul.png" : "/logo.png"}
                alt="Ciclourb Logo"
                className="h-10 w-auto md:h-12 lg:h-14 transition-all duration-300 hover:opacity-90 hover:scale-105"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <div key={item.label} className="relative group">
                    <div
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold cursor-pointer rounded-xl hover:bg-white/60 hover:shadow-md transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-[#d6c9a3]/30 ${
                        isDesafioIntermodal
                          ? "text-[#244A6B] hover:text-[#728A9A]"
                          : "text-[#4D3A08] hover:text-[#79693F]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </div>

                    <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-48 bg-white/95 backdrop-blur-md border-2 border-[#d6c9a3]/40 rounded-2xl shadow-2xl overflow-hidden">
                        {item.subItems.map((sub, index) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`block px-6 py-3 text-sm font-medium transition-all duration-200 ${
                              isDesafioIntermodal
                                ? "text-[#244A6B] hover:text-[#728A9A]"
                                : "text-[#4D3A08] hover:text-[#79693F]"
                            } ${
                              index !== item.subItems.length - 1
                                ? "border-b border-[#d6c9a3]/20"
                                : ""
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm border border-transparent hover:bg-white/60 hover:shadow-md hover:border-[#d6c9a3]/30 ${
                    isDesafioIntermodal
                      ? "text-[#193349] hover:text-[#244A6B]"
                      : "text-[#4D3A08] hover:text-[#79693F]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      <div className="md:hidden fixed top-4 right-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="sm"
              className="h-14 w-14 p-0 rounded-full bg-gradient-to-br from-[#FFF8E5] to-[#FFFBF0] border-2 border-[#d6c9a3] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-md"
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
              <SheetTitle
                className={`text-xl font-bold ${
                  isDesafioIntermodal ? "text-[#244A6B]" : "text-[#4D3A08]"
                }`}
              >
                Menu
              </SheetTitle>
              <SheetDescription
                className={`text-sm ${
                  isDesafioIntermodal ? "text-[#728A9A]" : "text-[#79693F]"
                }`}
              >
                Navegue pelas seções do site
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-4 mt-8 pb-32">
              {navItems.map((item) => {
                if (item.subItems) {
                  return (
                    <div key={item.label} className="flex flex-col gap-2">
                      <span
                        className={`px-4 py-2 text-lg font-medium ${
                          isDesafioIntermodal
                            ? "text-[#244A6B]"
                            : "text-[#4D3A08]"
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                            isDesafioIntermodal
                              ? "text-[#244A6B] hover:text-[#728A9A]"
                              : "text-[#4D3A08] hover:font-bold"
                          } hover:bg-white/40`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 hover:bg-white/40 ${
                      isDesafioIntermodal
                        ? "text-[#244A6B] hover:text-[#728A9A]"
                        : "text-[#4D3A08] hover:font-bold"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-[#d6c9a3]/30 text-center">
                <img
                  src={
                    isDesafioIntermodal ? "/logo-alt-azul.png" : "/logo.png"
                  }
                  alt="Ciclourb Logo"
                  className="h-12 w-auto mx-auto mb-3"
                />
                <p
                  className={`text-sm font-medium ${
                    isDesafioIntermodal ? "text-[#728A9A]" : "text-[#79693F]"
                  }`}
                >
                  Ciclourb - Mobilidade Sustentável
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
