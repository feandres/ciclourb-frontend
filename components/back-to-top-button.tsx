"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isDesafioIntermodal = pathname === "/desafio-intermodal";

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
            isDesafioIntermodal
              ? "bg-[#244A6B] text-[#FFF8E5] hover:bg-[#728A9A]"
              : "bg-[#4D3A08] text-[#FFF8E5] hover:bg-[#79693F]"
          }`}
        >
          <ChevronUp className="w-6 h-6" />
          <span className="sr-only">Voltar ao topo</span>
        </button>
      )}
    </>
  );
}
